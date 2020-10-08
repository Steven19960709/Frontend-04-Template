const EOF= Symbol("EOF") // end of files

function data (c) { // 初始状态，关注是不是开始状态
  if (c === "<") { // 转换为tagOpen状态
    return tagOpen
  } else if (c === EOF) {
    return
  } else { // 其他都理解为文本节点
    return data
  }
}

function tagOpen(c) {
  if (c === "/") { // 判断是不是结束标签，是的话转化为结束状态，左尖括号跟着正斜杠。
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c)
  } else if (c === '>') {

  } else if (c === EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // HTML 中有效的空白字符 \t: tab, \n: 换行 \f: fontfint, 空格
    // 认为tag name后跟着空格的情况
    return beforeAttributeName
  } else if (c === '/') {
    return  
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName
  } else if (c === ">") {
    return data
  } else {
    return tagName
  }
}

function  beforeAttributeName(c) {

  // 期待遇到一个属性名
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '>') {
    // 结束标志
    return data
  } else if (c === "=") {
    return beforeAttributeName
  } else {
    return beforeAttributeName
  }
}

function selfCloseingStartTag (c) {
  if (c === ">") {
    currentToken.isSelfClosing = true
    return data
  } else if (c === 'EOF') {

  } else {

  }
}
function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
}

parseHTML(`<html>
12212
</html>`)


module.exports.parseHTML = parseHTML