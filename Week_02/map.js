function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve(), ms)
  })
}
async function findpath (map, start, end) {
  let table = Object.create(map)
  var queue = [start]

  async function insert(x, y, pre) { // 入队的逻辑
    if (x < 0 || x >= 100 || y < 0 || y >= 100) { // 处理边缘
      return
    }
    if (table[y * 100 + x]) return
    // await sleep(300)
    container.children[y * 100 + x].style.backgroundColor = 'Lightgreen'
    // map[y * 100 + x] = pre // 做一个标记，不能重复走
    table[y * 100 + x] = pre
    queue.push([x, y])
  }

  while (queue.length) {
    let [x, y] = queue.shift() // 
    if (x === end[0] && y === end[1]) {
      let path = []
      while (x !== start[0] || y !== start[1]) { // 找对应的 pre
        path.push(map[y * 100 + x])
        [x, y] = table[y * 100 + x] // 重要操作，解构
        container.children[y * 100 + x].style.backgroundColor = 'purple'
      }
      return path
    }
    await insert(x - 1, y, [x, y])
    await insert(x, y - 1, [x, y])
    await insert(x + 1, y, [x, y])
    await insert(x, y + 1, [x, y])

    
    await insert(x - 1, y - 1, [x, y])
    await insert(x + 1, y - 1, [x, y])
    await insert(x - 1, y + 1, [x, y])
    await insert(x + 1, y + 1, [x, y])
  }
  return null
}

