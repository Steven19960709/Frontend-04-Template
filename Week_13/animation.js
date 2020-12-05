
setInterval(() => {
  // 不可控，可能会导致积压
}, 16) // 16毫秒每帧

let tick = () => {
  setTimeout(tick, 16)
}

let tick = () => {
  // 自重复
  let handler = requestAnimationFrame(tick) 
  cancelAnimationFrame(handler)
}


