const css = require('css')

let str = `body {
  width: 100px;
  height: 100px;
}
div {
  width: 300px;
  height: 300px;
}

`
let res = css.parse(str)
console.log(JSON.stringify(res, null, "    "))

