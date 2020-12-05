const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("animation start time")
const PAUSE_START = Symbol("pause start");
const PAUSE_TIME = Symbol("pause time")
const Status = {
  WAIT: Symbol("wait"),
  RUNNING: Symbol("running"),
  PAUSE: Symbol("pause"),
}
export class Timeline {
  constructor(props) {
    this.state = Status.WAIT
    this[START_TIME] = new WeakMap();
    this[ANIMATIONS] = new Set();
  }
  start() {
    if(this.state !== Status.WAIT) {
      return;
    }
    this.state = Status.RUNNING
    let startTime = Date.now();
    // 被暂停的时间
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Date.now();
      
      for(let animation of this[ANIMATIONS]) {
        let _startTime = Math.max(startTime, this[START_TIME].get(animation))
        let t = now - _startTime - this[PAUSE_TIME] - animation.delay;

        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation);
          // 保证最后相等，不然可能会超出一点点
          t = animation.duration;
        }
        if (t > 0) {
          animation.receiveTime(t)
        }
        
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }
  pause() {
    if(this.state !== Status.RUNNING) {
      return;
    }
    this.state = Status.PAUSE
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    if(this.state !== Status.PAUSE) {
      return;
    }
    this.state = Status.RUNNING
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }
  add(animation, startTime) {
    if(arguments.length < 2) {
      startTime = Date.now()
    }
    this[START_TIME].set(animation, startTime);
    this[ANIMATIONS].add(animation);
  }
  reset() {
    this.pause();
    this.state = Status.WAIT
    this[PAUSE_START] = 0;
    this[PAUSE_TIME] = 0;
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[TICK_HANDLER] = null;
  }
}
export class Animation{
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    timingFunction = timingFunction || (v => v)
    template = template || (v => v)
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction;
    this.delay = delay;
    this.template = template
  }
  receiveTime(time) {
    let range = (this.endValue - this.startValue);
    let progress = this.timingFunction(time/this.duration);
    this.object[this.property] = this.template(this.startValue + range * progress);
  }
}