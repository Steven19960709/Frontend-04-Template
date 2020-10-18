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

刚刚学到一个很底层的知识。

代码如下：

\
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

a.b = 3 // 先 new Number(a) 然后设置b属性。可以通过typeof来区分，是包装前的对象还是包装后的值

StringToNunber()

NumberToString()

## 语句 statement

### 运行时相关概念：确定执行顺序，语句执行结果介入

Completion Record type：

  if (x === 1) return 10 // 可能执行，也可能不执行，通过Completion record来判定

[[type]]: normal, break, continue, reutrn or throw
[[value]]: 基本类型
[[target]]: label

用来控制语句

### 简单语句

简单语句：里面不会容纳其他语句的语句。

#### 表达式语句 Expression Statement 简单语句最基本的一个类型

#### 空语句 EmptyStatement 单独一个分号，就是一个空语句

#### 调试语句 DebuggerStatement debbuger；不会用啥作用，会触发一个断电

#### 控制语句

    - ThrowStatement 报错语句
    - ContinueStatement  继续循环
    - BreakStatement 跳出循环
    - ReturnStatement 结束

### 复合语句

控制简单语句执行顺序

#### BlockState：块级语句

  {
    //
  }

#### IfStatement：if语句

#### SwitchStatement：不建议使用switch，可以使用多个if else代替

#### IterationStatement：迭代语句

    - while 语句
    - do while
    - for
    - for ... in
    - for ... of

#### WithStatement with语句

#### LabelledStatement label语句，简单语句前买一个label，可以用来跳到对应的循环

#### TryStatement：Try catch finally语句，try 不能省略花括号

  try {

  } catch () {

  } finally {
    // 即使try中return出去了，finally也会执行
  }

  [[type]]: return
  [[value]]: --
  [[target]]: tabel

## 声明

const let: 属于Lexical Declaration

### Function Declaration 函数声明

四种形态

- function
- function * Generator Declaration
- async function AsyncFuction Declaration
- async function * AsyncGenerator Declaration

### VariableState Declaration var

### classDeclaration：未经声明使用报错

### Lexical Declaration：未经声明使用报错

### 预处理机制 pre-process

    var a = 2
    function d() {
      a = 1
      return
      var a
    }
    d()
    console.log(a) // 2

作用域：针对代码里头来说，使用花括号来分割作用域

  function a() {
    var d = 1
    {
      const d = 4
      // ...
    }
  }

## 函数调用

执行栈。

Execution Context：执行上下文，保存栈内所有需要的变量。7大件，但不是全都有，分别如下：
    - code evaluation：代码保存信息
    - Function：函数初始化会有
    - Script or Module：Script和Module里的代码会有
    - Generator：Generator函数创建的上下文才有
    - Realm：保存所有使用内置对象
    - LexicalEnvironment：const ，let
    - VariableEnvironment：var 声明变量时保存的地址

Generator Execution Context
    - code evaluation state
    - Function
    - Script or module
    - Realm
    - lexicalEnvironment
    - VaraibleEnviroment
    - Generator

LexicalEnvironment：保存this，new.target，super，变量。

VariableEnvironment：仅仅用于处理var声明。用with({a: 1})声明的变量会穿透作用域。

Environment Record：多个子类

Realm：所有内置对象放在里头 在JS中，函数表达式和对象直接量均会创建对象。使用.做隐式转换也会创建对象。这些对象也是有圆形的，如果没有realm，就不知道他们的对象是什么。

var x = {} // 创建一个Object对象

1.toString() // 装箱过程

#### 扩展，纯函数

纯函数：输入一定，输出一定，没有副作用

优点：可缓存性，依赖明确。可测试，不需要伪造配置。并行代码，不需要访问共享的内存

    // 不纯的
    var signUp = function(attrs) {
      var user = saveUser(attrs);
      welcomeUser(user);
    };

    var saveUser = function(attrs) {
        var user = Db.save(attrs);
        ...
    };

    var welcomeUser = function(user) {
        Email(user, ...);
        ...
    };

    // 纯的
    var signUp = function(Db, Email, attrs) {
      return function() {
        var user = saveUser(Db, attrs);
        welcomeUser(Email, user);
      };
    };

    var saveUser = function(Db, attrs) {
        ...
    };

    var welcomeUser = function(Email, user) {
        ...
    };

### 函数柯理化

  curry 的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

  var add = function(x) {
    return function(y) {
      return x + y;
    };
  };

  var increment = add(1);
  var addTen = add(10);

  increment(2);
  // 3

  addTen(2);
  // 12
  