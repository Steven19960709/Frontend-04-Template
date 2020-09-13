// 字符串分析算法

// 字典书：大量高重复字符串的存储与分析（搜索关键字）
// KMP（KMP，三个计算机专家的名字首字母）：在长字符串里找模式（检查长字符串里是否有短字符串）
// Wildcard：带通配符的字符串模式
// 正则：字符串通用模式匹配，需要用到回溯。
// 状态及：通用字符串分析
// LL LR：字符串多层级结构分析

// 字典树：查字典，trie
let $ = Symbol('$')

class Trie {
  constructor () {
    this.root = Object.create(null)
  }
  insert (word) {
    let node = this.root
    for (let c of word) {
      if (!node[c]) {
        node[c] = Object.create(null)
      }
      node = node[c]
    }
    if (!( $ in node)) {
      node[$] = 0
    }
    node[$]++
  }
  most () {
    let max = 0
    let maxWord = null
    let visit = (node, word) => {
      if (node[$] && node[$] > max) {
        max = node[$] // 记录word出现的次数
        maxWord = word // 赋值maxWord
      }
      for (let p in word) {
        visit(node[p], word + p)
      }
    }
    visit(this.root, '')
    console.log(maxWord, max)
  }
}

function randomWord (length) {
  var s = ""
  for (let i = 0; i < 4; i++) {
    s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0))
  }
  return s
}

let trie = new Trie()
for (let i = 0; i < 100000; i++) {
  trie.insert(randomWord(4))
}

console.log(trie)