let element = document.documentElement

element.addEventListener('mousedown', e => {
  // mouse 鼠标事件,按下了之后才开始监听move 和 up

  let mousemove = e => {

  }
  let mouseup = e => {

  }
  
})

element.addEventListener('touchstart', (e) => {
  console.log(e.changedTouches)
})
element.addEventListener('touchmove', (e) => {
  console.log(e.changedTouches)
})
element.addEventListener('touchend', (e) => {
  console.log(e.changedTouches)
})
element.addEventListener('touchcancel', (e) => {
  for (let touch of e.changedTouches) {
    console.log('cancel', touch.clientX)
  }
})