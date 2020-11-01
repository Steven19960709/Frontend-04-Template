let a = document.getElementsByClassName('test')[0]
function revserS(ele) {
  let c = e.childNodes.length
  while (c-- > 0) {
    ele.appendChild(ele.childNodes[c])
  }
}

revserS(a)

let rang = new Range()
range.setStart(a, 9)
// 偏移值，如果是文本节点 偏移值为文字个数，如果是element，就是自元素的个数
range.setEnd(a, 3)

range = document.getSelection().getRangeAt(0)

// use Range API

function reverseChild (ele) {
  let range = new Range()

  range.selectNodeContents(ele)
  let fragment = range.extractContents()

  let l = fragment.childNodes.length

  while (l-- > 0) {
    fragment.appendChild(fragment.childNodes[l])
  }
  element.appendChild(fragment)
}