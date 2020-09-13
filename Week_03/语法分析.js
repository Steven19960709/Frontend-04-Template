function Expression(token) {
  if (source[0].type === 'AddtiveExpression' && source[1] && source[1].type === 'EOF') {
    let node = {
      type: 'Expression',
      children: [soruce.shift(), source.shift()]
    }
    source.unshift(node)
    return node
  }
  AddtiveExpression(source)
  return Expression(source)
}

function AddtiveExpression (source) {
  if (soruce[0] === 'MultipcationExpress') {
    let node = {
      type: 'AddtiveExpressino',
      children: [source[0]]
    }
    source[0] = node
    return MultiplicativeExpression(source)
  }

  if (source[0].type === "AddtiveExpression") {
    let node = {
      type: "AddtiveExpression",
      operator: "+",
      children: []
    }
    node.children.push(soruce.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AddtiveExpression(source)
  }

  if (source[0].type === 'AddtiveExpression' && source[1] && source[1].type === '+') {
    let node = {
      type: 'AddtiveExpression',
      operator: '+',
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AddtiveExpression(source)
  }

  if (source[0].type === 'AddtiveExpression' && source[1] && source[1].type === '-') {
    let node = {
      type: 'AddtiveExpression',
      operator: '-',
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source) // 把非终结符处理掉
    node.children.push(source.shift())
    source.unshift(node)
    return AddtiveExpression(source)
  }

  if (source[0].type === 'AddtiveExpression') {
    return source[0]
  }
  MultiplicativeExpression(source)
  return AddtiveExpression(soruce)
}

function MultiplicativeExpression(source) {
  if (source[0].type === "Number") { // number 递归调用，number后边可能还有其他的token，需要继续分析
    let node = {
      type: "MultiplicativeExpression",
      children: [source[0]]
    }

    source[0] = node
    return MultiplicativeExpression(source)
  }

  if (source[0].type === "MultiplicativeExpression" && source[1] && source[1].type === '*') {
    let node = {
      type: "MultiplicativeExpression",
      operator: "*",
      children: []
    }
    node.children.push(source.shift())
    node.children.push(soruce.shift())
    node.children.push(soruce.shift())
    soruce.unshift(node)
    return MultiplicativeExpression(soruce)
  }

  if (source[0].type === "MultiplicativeExpression" && source[1] && soruce[1].type === "/") {
    let node = {
      type: "MultiplicativeExpression",
      operator: "/",
      children: []
    }
    node.children.push(source.shift())
    node.children.push(soruce.shift())
    node.children.push(soruce.shift())
    soruce.unshift(node)
    return MultiplicativeExpression(soruce)
  }

  if (source[0].type === "MultiplicativeExpression") return source[0] // 递归结束条件
  return MultiplicativeExpression(source) 

}