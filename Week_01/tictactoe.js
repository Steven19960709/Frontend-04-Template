// let pattern = [
//   [1, 2, 0],
//   [0, 1, 0],
//   [0, 0, 0]
// ]
let pattern = [
  0, 0, 0,
  0, 1, 0,
  0, 0, 0
]

let color = 2
function show () {
  let board = document.getElementById('board')
  board.innerHTML = ''
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let ceil = document.createElement('div')
      ceil.classList.add('ceil')
      ceil.innerText = pattern[i * 3 + j] == 2 ? 'X' :
        pattern[i * 3 + j] == 1 ? 'O' : ''
        ceil.addEventListener('click', () => userMove(j, i))
        board.appendChild(ceil)
    }
    board.appendChild(document.createElement('br'))
  }
}
function userMove (x, y) {
  if (pattern[y * 3 + x]) { // 不允许重复点击
    return
  }
  pattern[y * 3 + x] = color
  debugger
  if (check(pattern, color)) {
    alert(color == 2 ? 'X is winner' : 'O is winner' )
  }
  color = 3 - color
  show()
  computerMove()
}
function computerMove() {
  console.log(color)
  let choice = bestChoice(pattern, color)
  console.log(choice)
  if (choice.point)
    pattern[choice.point[1] * 3 + choice.point[0]] = color
  if (check(pattern, color)) {
    alert(color == 2 ? 'X is winner' : 'O is winner')
  }
  color = 3 - color
  show()
}
function check (pattern, color) {
    // 外城循环表示3个横行
  for (let i = 0; i < 3; i++) {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j] !== color) {
        win = false
      }
    }
    if (win) return true
  }
  for (let i = 0; i < 3; i++) {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + i] !== color) {
        win = false
      }
    }
    if (win) return false
  }
  {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + 2 - j] !== color) {
        win = false
      }
    }
    if (win) return true
  }
  {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + j] !== color) {
        win = false
      }
    }
    if (win) return true
  }

  return false
}

function clone (pattern) {
  return Object.create(pattern)
}

function willWin (pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j] !== 0) 
        continue
      let tmp = clone(pattern)
      tmp[i * 3 + j] = color
      if (check(tmp, color)) {
        return [j, i]
      }
    }
  }
  return null
}

function bestChoice (pattern, color) {
  let point = willWin(pattern, color)
  if (point) {
    return {
      point: point, // 位置
      result: 1 // 代表要赢还是输 赢 1 输 -1 和 0
    }
  }
  let result = -2
  outer: for(let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j ++) {
      if (pattern[i * 3 + j] !== 0) continue
      let tmp = clone(pattern)
      tmp[i * 3 + j] = color
      let opp = bestChoice(tmp, 3 - color) 
      if (-opp.result >= result) { // 保证不输
        point = [j, i]
        result = -opp.result
      }
      if (result == 1) {// 胜负剪支
        break outer
      }
    }
  }
  return {
    point: point,
    result: point ? result : 0
  }
}

show()
