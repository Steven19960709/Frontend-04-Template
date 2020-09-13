// wildcard 通配符 两种通配符，由星号和问号结合起来
// ab*cd*abc*a?d: 这里前两个星号，尽可能少匹配，最后一个*号，尽可能多匹配。
//一个wildcard 等于多个kmp
function find (source, pattern) {
  let startCount = 0
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') startCount++
  }
  if (startCount === 0) {
    // 精确匹配
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== "?") return false
    }
    return true;
  }
  let i = 0
  let lastIndex = 0
  for (i = 0; pattern[i] !== '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') return false
  }
  lastIndex = i // 更新lastindex
  for (let p = 0;  p < startCount - 1; p++) {
    i++
    let subPattern = ""
    while(pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }
    let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g")
    reg.lastIndex = lastIndex
    console.log(reg.exec(source))
    lastIndex = reg.lastIndex
  }
  for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
    if (pattern[pattern.length - j] !== source[source.length - j]
      && pattern[pattern.length - j] !== '?')
      return false
  }
  return true
}



let res  = find('acdsfabc', 'ac*bc')
console.log(res)