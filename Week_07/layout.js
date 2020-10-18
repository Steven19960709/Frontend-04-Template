function getStyle (element) {
  if (!element.style) { // 
    element.style = {}
  }
  for (let prop in element.computedStyle) {
    let p = element.computedStyle.value
    element.style[prop] = element.computedStyle[prop].value

    if (element.style[prop].toString().match(/px$/)) {// xxx px转化为数字
      element.style[prop] = parseInt(element.style[prop])
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
  }
  return element.style
}

function layout(element) {
  if (!element.computedStyle)  return
  let elementStyle = getStyle(element)
  if (elementStyle.display !== 'flex') return // 只处理flex
  let items = element.children.filter(e => e.type === 'element') // 过滤结点，wen ben jie dian 之类的
  items.sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  })
  var style = elementStyle
  ['width', 'height'].forEach( (size) => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null
    }
  })
  // 确保所有用到的属性都有值

  if (!style.flexDirection || style.flexDirection === 'auto') style.flexDirection = 'row' // 默认值设置为row
  if (!style.alignItems || style.alignItems === 'auto') style.alignItems = 'stretch'
  if (!style.justifyContent || style.justifyContent === 'auto') style.justifyContent = 'flex-start'
  if (!style.flexWrap || style.flexWrap === 'auto') style.flexWrap = 'nowrap'
  if (!style.alignContent || style.alignContent === 'auto') style.alignContent = 'stretch'

  let mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase

  if (style.flexDirection === 'row') {
    mainSize = 'width' // 主轴尺寸
    mainStart = 'left' // 主轴开始位置 有可能是row-reverse
    mainEnd = 'right' // 主轴结束位置
    mainSign = +1 // 主轴符号 有可能是+1 或 -1
    mainBase = 0  // 从哪里开始，跟mainSign是一对
    // 交叉轴得 数据
    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainBase = style.width
    mainSign = -1
    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection === 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = 0

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }

  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSign = -1
    mainBase = style.height

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
    
  }

  if (style.flexWrap === 'wrap-reverse') {// 反向换行 对交叉轴开始结束互换
    // 交叉轴只受wrap-reverse影响
    let tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossBase = 0
    crossSign = 1
  }
  
  var isAutoMainSize = false
  
  if (!style[mainSize]) {// auto sizing 父元素有子项撑开
    elementStyle[mainSize] = 0
    for (var i = 0; i < items.length; i++) {
      let itemStyle = items[i]
      if (itemStyle[mainSize] !== null || itemStyle[mainSize]) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize]
      }
    }
    isAutoMainSize = true
  }

  var flexLine = []
  var flexLines = [flexLine]
  var mainSpace = elementStyle[mainSize] // 剩余空间
  var crossSpace = 0
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    var itemStyle = getStyle(item)
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }
    if (itemStyle.flex) { // 有flex属性，说明可伸缩
      flexLine.push(item)
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize]
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]) // 交叉轴高度取最高的
      }
      flexLine.push(item)
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        // is bigger than the father element
        itemStyle[mainSize] = style[mainSize] // 压到跟主轴一样大
      }
      if (mainSpace < itemStyle[mainSize]) { // 如果放不下，就换行
        flexLine.mainSpace = mainSpace // 保存剩余空间，以后有用
        flexLine.crossSpace = crossSpace // 交叉轴空间
        flexLine = [item] // 创建一个新行
        flexLines.push(flexLines) 
        mainSpace = style[mainSize]
        crossSpace = 0
      } else { // 能放下
        flexLine.push(item)
      }

      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        // 计算交叉轴尺寸
        crossSpace = Math.max(crossSpace, itemStyle[crossSpace])
      }
      mainSpace -= itemStyle[mainSize]
    }

  }

  flexLine.mainSpace = mainSpace

  // 计算主轴

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace
  } else {
    flexLine.crossSpace = crossSpace // 保存一下交叉轴空间
  }

  if (mainSpace < 0) {
    // overflow (happens only if container is singler line), scale every item
    var scale = style[mainSize] / (style[mainSize] - mainSpace) // 计算出等比例缩放的系数
    var currentMain = mainBase
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      let iteStyle = getStyle(item)
      if (itemStyle.flex) { //flex 不用参与等比例压缩
        itemStyle[mainSize] = 0
      }
      itemStyle[mainSize] = itemStyle[mainSize] * scale
      // 计算元素在主轴上的计算
      itemStyle[mainStart] = currentMain
      itemStyle[mainEnd] = iteStyle[mainStart] + mainSign * itemStyle[mainSize] 
      currentMain = itemStyle[mainEnd] // 下一个元素的mainStart 等于上一个元素的mianEnd
    }
  } else {// mainSpace 大于 0
    flexLines.forEach((items) => {
      var mainSpace = items.mainSpace
      var flexTotal = 0
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let itemStyle = getStyle(item)

        if ((itemStyle.flex !== null && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex
        }
      }
      if(flextotal > 0) {
        // 如果有flex元素，永远是沾满一行的
        var currentMain = mainBase
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var itemStyle = getStyle(item)

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace/ flexTotal) * itemStyle.flex
          }

          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd]
        }
      } else {
        // 没有 flexible flex子项， 需要根据justifyContent规则来进行分配

        if (style.justifyContent === 'flex-start') {
          var currentMain = mainBase
          var step = 0
        }
        if (style.justifyContent === 'flex-end') {
          var currentMain = mainSpace * mainSign + mainBase
          var step = 0
        }
        if (style.justifyContent === 'center') {
          var currentMain = mainSpace / 2 * mainSign + mainBase
          var step = 0
        }
        if (style.justifyContent === 'space-between') {
          // 这里会有间隔，该间隔为items.length - 1
          var step = mainSpace / (items.length - 1) * mainSign
          var currentMain = mainBase
        }
        if (style.justifyContent === 'space-around') {
          var step = mainSpace / items.length * mainSign
          var currentMain = step / 2 + mainBase
        }

        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          itemStyle[mainStart, currentMain]
          itemStyle[mainEnd] = iteStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd] + step
        }
      }
    })
  }

  // 计算交叉轴
  // 根据交叉轴方向
  var crossSpace // 计算是否填满了父元素的crossSpace
  if (!style[crossSize]) { // 父元素没有crossSize，方案就是吧高度撑开之后加上去
    crossSpace = 0
    elementStyle[crossSize] = 0
    for (var i = 0; i <flexLine.length; i++) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace // 计算所有行的行高
    }
  } else {
    // 如果有行高，就需要一次减掉每一行的crossSize， 最后得到一个剩余行高
    crossSpace = style[crossSize]
    for (var i = 0; i < flexLinex.length; i++) {
      crossSpace -= flexLinex[i].crossSpace
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    // 计算是否是从尾巴到头排布
    crossBase = style[crossSize]
  } else {
    crossBase = 0
  }
  var lineSize = style[crossSize] / flexLines.length

  var step
  if (style.alignContent === 'flex-start') {
    crossBase += 0
    step = 0
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace //
    step = 0
  }
  if (style.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2
    step = 0
  }
  if (style.alignContent === 'space-between') {
    crossBase += 0
    step = crossSpace / (flexLinex.length - 1)
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / (flexLinex.length)
    crossBase += crossSign * step / 2
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }
  flexLines.forEach((items) => {
    var lineCrossSize = style.alignContent === 'stretch' ? (items.crossSpace + crossSpace / flexLinex.length) : items.crossSpace // 改行交叉轴的尺寸
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var itemStyle = getStyle(item)
      var align = iteStyle.alignSelf || style.alignItems // 收到alignSelf影响和父级的alignItems影响

      if (item === null) {
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
      }
      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemsStyle[crossSize]
      }
      if (align === 'flex-end') {
        itemStyle[crossStart] = crossBase + crossSign * lineCrossSize
        itemStyle[crossEnd] = itemStyle[crossEnd] - crossSign * itemsStyle[crossSize]
      }
      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2
        itemStyle[crossEnd] = itemStyle[crossStart] - crossSign * itemsStyle[crossSize]
      }
      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSign]))
        itemStyle[crossSize] = crossSign * (itemStyle[crossSign])
      }
    }
    crossBase += crossSign  * (lineCrossSize + step)
  })

}

module.exports = layout