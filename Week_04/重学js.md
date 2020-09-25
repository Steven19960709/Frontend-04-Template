# 语言按语法分类

非形式语言：中文，英文

形式语言：（乔姆斯基谱系）上下包含的关系

- 0型无限制文法
- 1型上下文相关文法
- 2型上下文无关文法
- 3型正则文法

## 产生式

## 图灵完备性

命令式——图灵机：goto，if while

声明式——lamba，：递归

## 动态与静态

动态：在客户设备上/在线服务器；产品实际运行时；runtime，运行时

静态：在程序缘设备商；产品开发时；compiletime

## 命令时语言的设计

atom：原子级，关键字，直接量。
expression：表达式，原子级通过符号连接变成表达式，四则运算，逻辑运算，等
statement：语句，表达式+标识符+结构 = 语句
structure：结构层级，function，class这样的。就是一个结构

## JavaScript 类型

### Atom 原子

Grammar：Literal(直接量），Variable，Keywords，WhiteSpace， Line Terminator

Runtime：Types，Execution Context

  Type: 基本类型，Number，String，BOOlean，Object，Null，Undefined，Symbol
    Null：有值，但是为空
    undefined：根本没有赋值
    Symbol：一定程度上代替了String的作用作为object的key

### Number

Double Float：是双精度浮点类型

IEEE 754 标准：Double Float。

把一个数字拆成指数和有效位数。指数决定了浮点数表示的范围。

Sign（1）+Exponent（11）+Fraction（52），1个符号位，11个指数位，+52个精度位(会有一个) 共64位

0 00000000001 000000000000000000000000000000000 => 1
sing exponent  fraction

精度损失，导致JavaScript 0.2 + 0.1 ！= 0.3

十进制转化为2进制的时候造成进度损失

要使用exponent作比较

#### Number 语法

十进制，二进制，八进制，18进制

0.toString() 报错，因为0.是一个正确的表示

0. toString() 不报错

### String

#### Character

字符

#### Code Point（码点）

用来表示Character，是一个数字，例如：97代表a，

#### Encoding（编码方式）

UTF8：默认一个字节表示一个字符，兼容ASCII，一个ACSII编码字符，同时也一定是UTF-8编码的一段文字

UTF-16：默认2个字节编一个字符，16比特位


#### 字符集

ASCII: 英文数字各种编码符，没有中文

Unicode：有中文

UCS：

GB：2312，广泛使用，但是跟Unicode不一样，一个字可能对应不一样的码点

GB18030：基本所有多有

ISO-8859

BIG5：大五码

### String语法

let c = '\\' => "\"

#### Object

state：状态
identifier：唯一标识
behavior：行为

分类，常见的描述对象的方式

归类和分类是两个主要的流派

归类：多继承，C++。鱼（生活在水里，会游泳，等多重继承）

分类：单继承结构，会有一个基类，object。

JavaScript，Prototype

属性：key value 对 。JavaScript使用属性来同一抽象对象状态和行为。一般来说，数据属性用于描述状态，访问器属性用来描述行为。

数据属性中如果存储函数，也可以用以描述行为。

一个对象，只需要描述自己和原型的区别即可。

##### 两种方式来进行面向对象抽象

基于原型：Object.defineProperty，Object.create，Object.setPrototypeOf，Object.getPrototypeOf

基于类的：new class extends。

new function prototype // 不要使用这种方式。ES3 版本的js

  class Car {
    constructor (width, color, height) {
      this.width = width
      this.color = color
      this.height = height
    }
  }

##### 特殊对象

javascript Host 对象，本身没有定义，但是可以有宿主（浏览器）来实现。如setTimeout，
## 对象

对象的分类：宿主对象，内置对象，固有对象，原声对象，普通对象

- 宿主对象：由JavaScript宿主提供的对象，行为由宿主决定（window，document）
- 内置对象：javascript语言提供的对象
  - 故有对象：JavaScript运行时创建的对象
  - 原声对象：new Array，new Regexp
  - 普通对象：{} 的对象

### 对象的属性

数据属性：具体存储的值，configureable设置为false，改属性不能改

Accessor property：访问器属性，访问器属性多数都是用来描述行为

访问对象的属性的时候，会先在该对象查看，然后找该对象的原型对象（原型链）

原型链客可以用来实现：对象本身只需要描述跟他原型不一致的行为和特征。

{},[],protptype:基本原型访问

基于原型的面向对象：object.create，object.setPrototypeOf，Object.getPrototypeOf
基于类的面向对象：class，extends，new

### 函数对象与构造器对象

函数对象：对象具有[[call]]私有属性的对象

构造器对象：对象具有contractor属性的对象

这里首先要理解题目：具有特殊行为的对象。什么叫做特殊行为的对象呢？

特殊行为的对象，相对于说的是原生对象和固有对象来说的。原生对象和固有对象都属于内置对象，

即JavaScript语言提供的对象。

这里特殊行为的对象有：

- Array：特殊在它可以根据元素的最大下标的变化，length会随之变化
- Object.prototype: 是所有对象的默认原型对象，无法给自己设定原型
- String：为了支持下标运算，字符串正整数下标，访问会去找对应字符串里的对应位置，负数为undefined。
- Arguments: arguments非负整数下标属性，跟对应的变量联动（形参和实参，对应的变化）
- 模块的namespace对象
- 类数组和数组缓冲区：跟内存块联系在一起，下标运算比较特殊
- bind之后的function：与缘function相关联


