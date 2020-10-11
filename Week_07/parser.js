const EOF= Symbol("EOF") // end of files
let currentToken = null
let currentAttribute = null
let currentTextNode = null
let css = require('css')
let stack = [{type: 'document', children: []}] // 初始根结点
function emit (token) {
  if (token.type === 'text') return // 如果是文本节点
  let top = stack[stack.length - 1] // 取出站顶
  if (token.type === 'startTag') {
    let element = {
      // dom树里头只会有element和node这两个概念，不会有所谓的tag
      type: 'element',
      children: [],
      attributes: []
    }
    element.tagName = token.tagName
    for (let p in token) {
      if (p !== "type" && p != "tagName") {
        element.attributes.push({// 处理属性
          name: p,
          value: token[p]
        })
      }
    }

    computedCSS(element) // 计算css规则

    top.children.push(element) // 处理父子关系
    element.parent = top


    if (!token.isSelfClosing) { // 自封闭
      stack.push(element)
    }
    currentTextNode = null
  } else if (token.type === 'endTag') { // 结束标签
    if (top.tagName !== token.tagname) { // 检查是否相等，相等就pop，否则就报错
      throw new Error('tag start end do not match') 
    } else {
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content) // get css content 
      }
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    // 基本思路：相邻的文本节点进行合并，遇到start或者endtag都会清空currentTextNode

    if (currentTextNode === null) { // 创建文本节点
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content// 不断追加新的内容，直到遇到endTag，结束
  }
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

let rules = []
function addCSSRules (text) {
  var ast = css.parse(text)
  
  rules.push(...ast.stylesheet.rules)
}

function match (element, selector) {
  if (!selector || !element.attributes) return false // 用attribute来区分是不是文本节点，如果是文本节点就不需要判断
  if (selector.charAt(0) === '#') { // 匹配id
    let attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && attr.value === selector.replace('#', '')) return true
  } else if (selector.charAt(0) === '.') {// 匹配class
    let attr = element.attributes.filter(attr => attr.name === 'class')[0]
    if (attr && attr.value === selector.replace(".", '')) return true
  } else {// 匹配tag选择器
    if (element.tagName === selector) {
      return true
    }
  }
  return false
}

function specificity (selector) {
  let p = [0, 0, 0, 0]
  let selectorParts = selector.split(" ")
  for (var part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1
    } else if (part.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}
function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) return sp1[0] - sp2[0]
  if (sp1[1] - sp2[1]) return sp1[1] - sp2[1]
  if (sp1[2] - sp2[2]) return sp1[2] - sp2[2]
  return sp1[3] - sp2[3]
}

function computedCSS(element) {
  // according the rules and element can computed the element css rules
  console.log(rules)
  // console.log()
  let elements = stack.slice().reverse() // 获取父元素。
  // 栈是不断变化，这里使用slice，不传参数默认把数组复制一次，防止污染数组
  // 一级一级往父元素找
  if (!element.computedStyle) element.computedStyle = {} // 保存由css来设置的属性
  for (let rule of rules) {
    // rule 父元素 双循环
    let selectorParts = rule.seletcors[0].split(" ").reverse() // 跟elements保持一致
    if (!match(element, selectorParts[0])) continue // element当前元素，必须要跟selector匹配
    let matched = false
    var j = 1
    for (var i = 0; i < element.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        // 匹配到了就自增
        j++
      }

    }
    if (j >= selectorParts.length) matched = true // 所有选择器都配上了
    if (matched) {
      // 成功匹配到,把style作用到元素上
      let sp = specificity(rule.selector[0])
      let computedStyle = element.computedStyle
      for (let declaration of rule.declaration) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {}
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          // 如果旧的更小，就用新的进行覆盖
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }
    }
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