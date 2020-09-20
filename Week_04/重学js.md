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

## Number

### Atom 原子

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




