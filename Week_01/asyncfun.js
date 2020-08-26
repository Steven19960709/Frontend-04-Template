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