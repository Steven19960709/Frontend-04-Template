# 学习笔记 重学css

总体结构：@charset @import rules @media @page


//行内||important id class tagName
2
/*通配选择符的权值 0,0,0,0
3
标签的权值为 0,0,0,1
4
类的权值为 0,0,1,0
5
属性选择的权值为 0,0,1,1 0,0,1,0
6
伪类选择的权值为 0,0,1,0
7
伪对象选择的权值为 0,0,0,1
8
ID的权值为 0,1,0,0
9
important的权值为最高 1,0,0,0
10

## 重学CSS

规则：@import， @media， @keyframes，@font-face，@support，@page，@namespace，@charset，@counter-style

common-rules：两部分：selector，declaration。

slector：

简单选择器：ID，class，伪类：，伪元素：：，tag，通配符，

复合选择器：子孙，通过空格分割，父子，通过大于。并列选择，。兄弟～选择

复杂：div.test>div.about

nth-lastchlid：倒数第几个儿子节点

声明支持使用变量。

:root {
  --main-color: #red;
}

div {
  color: --main: var(--main-color);
}

伪类：

- 链接性:link, :visted, :hover, :active, :focus, :target
- 树形结构: :empty, :nth-child(even|odd) :ntg-last-child() 
    :first-child, :last-child, :only-child // 会破坏渲染时机，影响性能

伪元素：

::before, ::after, 

::first-line, ::first-letter

伪元素可设置的属性都不一样，注意

