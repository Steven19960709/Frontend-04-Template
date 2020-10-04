
function matchA (string) {
  // 简单匹配
  for (let c of string) {
    if ( c == 'a') return true
  }
  return false
}

function matchAb (str) {
  // 非状态机版本
  let fA = false
  for (let c of string) {
    if (c == 'a') fA = true
    else if (fA && c === 'b') return true
    else fA = false
  }
  return false
}

function matchAbcdef (str) {
  // 飞状态机版本，随着string边际递增，代码if else分支增多，复杂。
  let fA = false
  let fB = false
  let fC = false
  let fD = false
  let fE = false
  for (let c of string) {
    if (c === 'a') fA = true
    else if (fA && c === 'b') fB = true
    else if (fB && c === 'c') fC = true
    else if (fC && c === 'e') return true
    else {
      fA = false
      fB = false
      fC = false
      fD = false
      fE = false
    }
  }
  return false
}

function match (str) {
  function start (c) {
    if (c === 'a') {
      return foundA
    } else {
      // reconsume 处理
      return start(c)
    }
  }
  function end (c) {
    return end
  }
  function foundA (c) {
    if (c === 'b')  return foundB
    return start(c)
  }
  function foundB (c) {
    if (c === 'c') return foundC
    return start(c)
  }
  function foundC (c) {
    if (c === 'd') return foundD
    if (c === 'a') return foundA2
    return start(c)
  }
  function  foundA2 (params) {
    if (params === 'a') return foundB('b')
    return start(params)
  }
  function foundB2 (c) {
    if (c === 'x') return end
    return foundB(c)
  }
  function foundD (c) {
    if (c === 'e') return foundE
    return start(c)
  }
  function foundE (c) {
    if (c === 'f') return  end
    return start(c)
  }
  let state = start
  for (let c of str) {
    state = state(c)
  }
  return state === end
}


match('abcdefaaaa')