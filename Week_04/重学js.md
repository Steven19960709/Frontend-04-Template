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