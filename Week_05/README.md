# 学习笔记

# 表达式 Expression

## 语法树 优先级 的关系

运算符的优先级会影响到语法树的构成

JavaScript是使用产生式来描述优先级

### Member运算符优先级最高：

- Member运算最高。以下是member运算例子

  - a.b
  - a[b]
  - foo`string` // 这里会把string当作参数
  - super.b
  - super['b']
  - new.target
  - new Foo()

new a()()

- New 运算，new a 没有括号

new new a() // new a() 运算的优先级更高

### Reference 引用类型

a.b 取出来的值不是基础类型，而是引用类型，它是运行时的一种类型。标准中的类型

两部分：

- Object，对象
- key：可以使string，或者 Synmbol

写操作处理：delete，assign，都是需要知道这个引用类型的相关信息。

### Call Expressions

Call Expressions

- foo()
- super()
- foo()['b']
- foo().b
- foo()`abc`

example:  new a()['b']

new a()['b']: new a()：这个Member 运算符优先级最高，所以new a(),然后再处理  ['b']

### left handside & right handside 

a.b = c

a+b = c // 报错

不可以放到等号左边：

a++，a--，--a，++a

example：++a++， ++(a++)

### Unary expression 单木运算符

- delete a.b  
- void foo()
- typeof a
- +a
- -a
- !a
- ~a 取反
- await a

### Exponental

唯一右结合运算符

3 ** 2 ** 3 三的8次方

### + - * / 

位yi运算   >> << >>>
关系运算：> < >= <= 

### 判等

== != == === !== 
位运算：bitwise & ^ |


### 逻辑运算，最低优先级，短路yuanze。

### 唯一三目运算符 Conditional

## 类型转换

双等号的转换规则非常恶心。同种类型可以比较，不同类型，基本上都是先转化为Number类型在比较。

### 拆箱转换

把一个Object转化为基本类型。toPremitive阶段。

toString，valueOf,[Symbol.toPrimitive]()，来转

eg: var x = {}

var o = {
  toString() {return '2'},
  valueOf() {return 1},
  [Symbol.toPrimitive]() {return 3}
}

x[o] = 1

console.log("x" + o) // x调用valueOf方法进行转换

字符串：toString()

包装类：如果属性访问，例如a.b，如果a是一个基础类型，会先调用对应的包装类方法。生产对应对象。
例如：let  a = 2

a.b = 3 // 先 new Number(a) 然后设置b属性。