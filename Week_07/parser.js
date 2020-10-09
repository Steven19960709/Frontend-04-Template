const EOF= Symbol("EOF") // end of files
let currentToken = null
let currentAttribute = null
function emit (token) {
  console.log(token)
}

function data (c) { // 初始状态，关注是不是开始状态
  if (c === "<") { // 转换为tagOpen状态
    return tagOpen
  } else if (c === EOF) {
    emit ({
      type: "EOF",
    })
    return
  } else { // 其他都理解为文本节点
    emit({// 文本节点
      type: "text",
      content: c
    })
    return data
  }
}

function tagOpen(c) {
  if (c === "/") { // 判断是不是结束标签，是的话转化为结束状态，左尖括号跟着正斜杠。
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = { // 对current赋予个初值
      type: "startTag",
      tagName: ""
    }
    return tagName(c) // reconsume 
  } else {
    return
  }
}

function endTagOpen(c) {// 结束标签的状态
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(c) // 获取endTag的标签名
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
    return selfCloseingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {// 如果是一个字母就会对tagName追加一个tagName
    currentToken.tagName += c //.toLowerCase() 
    return tagName
  } else if (c === ">") {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}

function  beforeAttributeName(c) {

  // 期待遇到一个属性名
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === "/" || c ===EOF || c === '>') {
    // 结束标志
    return afterAttributeName(c)
  } else if (c === "=") { // error
    return beforeAttributeName
  } else {
    currentAttirbute = {
      name: "",
      value: ""
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\n\t\f ]$/) || c === '/' || c === EOF) {
    return attributeName(c)
  } else if (c === "=") {
    return beforeAttributeValue
  } else if (c === "\u0000") {
    
  } else if (c === "\"" || c === "'" || c === "<") {
    
  } else {
    currentAttriobute.name += c
    return attributeName
  }
}
function beforeAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === EOF || c ===">") {
    return beforeAttributeValue
  } else if (c === "\"") {
    return doubleQuotedAttributeValue
  } else if (c === "\'") {
    return singleQuotedAttributeValue
  } else if (c === ">") {
    // return data
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue (c) {
  if (c === "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === '\u0000') {
    
  } else if (c === EOF) {

  } else {
    currentAttirbute.value += c
    return doubleQuotedAttributeValue
  }
}
// <div id='ss'x='da'>这种是不合法的
function afterQuotedAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfCloseingStartTag
  } else if (c === ">") {
    currentToken[currentAttirbute.name] = currentAttirbute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentAttirbute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue (c) {
  if (c === "\'") {
    currentToken[currentAttribute.name] = currentAttirbute.value
  } else if (c === '\u0000') {
    
  } else if (c === EOF) {

  } else {
    currentAttirbute.value += c
    return singleQuotedAttributeValue
  }
}

function UnquotedAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttirbute.value
    return beforeAttributeValue
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfCloseingStartTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === '\u0000') {

  } else if (c == "\"" || c === "'" || c === "<" || c === "=" || c === "`") {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
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