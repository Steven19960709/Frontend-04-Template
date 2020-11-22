# 组件化

怎样扩展HTML标签，可服用。组件化非常重要。提升复用

组件是跟UI强相关的。

对象几个关键概念：属性，方法和继承

组件：属性，方法，继承，特性，config：配置项（参数），state：状态，Event：事件，组件往外传，生命周期，children：树形结构的描述。

组件描述UI

attribute：一般都是Markup lanuage来描述。强调描述性。

property：属性，跟对象的属性是一回事。强调从属关系

attribute和property是否统一，有可能，看设计者。

信息流转传递方向。

div.className

attribute：是一个字符串。

style="color:blue"

div.style: 对象

- a.href // http://m.tabao.com, 这个url是resolve过的结果。
- a.getAttribute('href') // "m.taobao.com" // 跟htmlo代码完全一样

  <input value="cute"/>

  <script>
    let input = document.getElementByTagName('input')
    input.value
    input.getAttribute('value')
    
    input.value = "hello" // 此时input 的value已经变为hello
    input.value // hello
    input.getAttribute('value') // cute

如何设计组件状态：

            Markup set  |  JS set  |  JS change  |   User input change  |

property      no            yes           yes         not sure（大部分情况不能让用户改变）

attribute     yes           yes           yes         not sure（大部分情况不能让用户改变）

state         no            no            no            yes （只能从组件内部改变，不能从外部改变）

config        no            yes           no            no （不可更改性，一次性传入）

### 生命周期

- created（创建）

- mount（显示），unmount（卸载）

- render/update（更新）

- destroyed（销毁）

### children

两种类型：Content型 Chidlren和Template型 Children

