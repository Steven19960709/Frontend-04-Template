# 学习笔记

## 异步编程

原始：callback

setTimeout(() => {
  console.log('green')
  setTimeout(() => {
    console.log('yellow')
    setTimeout(() => {
      console.log('red')
    }, 3000)
  }, 2000)
}, 1000)

ES6：promise

    function sleep (time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    }

    sleep(2000).then(() => {
      console.log('green')
      sleep(1000).then(() => {
        console.log('yellow')
        sleep(3000).then(() => {
          console.log('red')
        })
      })
    })

ES7： async

  function sleep (time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  async function light () {
    await sleep(1000)
    console.log('green')
    await sleep(2000)
    console.log('yellow')
    await sleep(3000)
    console.log('red')
  }

