let callbacks = new Map()
let usedReactives = []
let object = {
  a: 1,
  b: 2
}

let po = reactive(object)

effect(() => {
  console.log(po.a)
})

function effect(callback) {
  usedReactives = []
  callback()
  for (let reactivity of usedReactivties) {
    if (!callbacks.has(reactivity)) {
      callbacks.set(reactivity[0], new Map())
    }
    if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0].set(reactivity[1], []))
    }
    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
  }

}
  function reactive(object) {
    return new Proxy(object, {
      set(obj, prop, val) {
        obj[prop] = val
        if (callbacks.get(obj)) {
          if (callbacks.get(obj).get(prop)) {
            for (let callback of callbacks.get(obj).get(prop)) {
              callbacks()
            }
          }
        }
        return obj[prop]
      },
      get(obj, prop) {
        usedReactives.push([obj, prop])
        return obj[prop]
      }
    })
  }