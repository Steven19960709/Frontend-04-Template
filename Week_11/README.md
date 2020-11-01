# 学习笔记 重学HTML

# HTML概述

Html是一种数据描述语言。XML和SGML是HTMl的超集。SGML是上世纪60年代的产物，庞大复杂，IBM开始用。

DTD与XML namespace

DTD机制浏览器实现访问，会造成W3C服务器压力巨大。

DTD是SGML规定的定义子集的格式。常用元素都用定义。

尽量不要使用nbsp来表示空格，会破坏语义。

几个关键的转义：

  - quot  &#34
  - amp &#38;#38;
  - lt &#38;#60
  - gt &#39

每个namespace代表1个语言

## HTML语义

HTML是一个语义系统，应该先考虑语义，而不是表现。

几个语义化标签：

  - hggroup：正副标题包裹
  - 使用伪元素，或者white-space来控制空格样式，而不是使用nbsp
  - strong：表示重要性，strong
  - em：辅助语气，表强调
  - gigure：标签，一般图片下边的描述就用figure
  - ol，li：有序列表，可以使用counter来改变列表序号样式
  - nav：导航
  - dfn：下定义标签
  - pre：案例格式化代码
  - code：代码标签
  - fotter：底部

## HTML 语法

合法元素：

  - Element
  - Text
  - Comment：注释节点
  - Document type：&lt!Doctype html&gt
  - Processing Instruction：预处理语法
  - CDATA：特殊语法

## 事件API

  addEventLister(type, listner, options)
  options: {
    capture: true,捕获,
    once: ,
    passive: 阻止默认行为，需手动置false
  }

冒泡和捕获，先补货后冒泡。从外到内捕获到元素，在发散

## DomAPI

节点部分，事件部分，Range部分

### 节点部分

Node类，所有DOM上挂在的东西都是继承自Node。

几大类：Element,Document,character,document fragment, document type

  - element: 
    - html element
      - HtmlAnchoreElement
      - HtmlAudioElement
      .....
    - SvgElemnt
      - SvgAlement
      ......
  
  - Document
  - CharacterData:
    - Text
    - Comment
    - processiong Instruction 预处理信息
  - Document Fragment
  - Document Type

  ### 事件部分

  - 导航类操作

    Node系列（有可能选中的是文本节点或者别的节点）：parentNode,childNodes, lastChild, nextSibling, previousSibling, parentElement
    Element系列（只选择元素节点）：parentElement，children，firsetElemebt,lastElement,nextElementChild,opreviousElementSibling
  
  - 修改操作

    appendChild,inserBefore
    removeChildreplacerChild

  没有insterAfter，是因为根据最小api设计原则。利用第一组即可完成操作

  - 高级操作
  CompareDocumenbtPosition
  Contains：重要，求是否有包含关系
  isEqualNode，isSameNode，
  cloneNode，重要，支持深度克隆节点

### Range API部分

可以精确操作节点。

*** 如果操作元素已经在DOM树上，进行insert 或者 append操作，不许要remove

Range：指定一个范围

  - range.setStartBefore
  - range.setEndBefore
  - range.startAfter
  - range.Endafter
  - range.Node
  - range.NodeContent

  - range.extractContent() // 取内容，是一个文档碎片，fragment

  如果是半个节点，会自动不上结束标签

DOM API 其实是对应hmtl的对象化

### CSSOM，就是CSS语法的抽象

document.styleSheets：获取通过style标签，或者link标签的样式

  伪元素无法通过DOM API直接修改，只能通过CSSOM来修改

getComputedStyle，重要，可以取伪元素的样式值，而且对于动画中间值也可以使用getComputedStyle获取样式。

CSSOM view 部分

获取layout之后的信息

- window
  - window。innerHeight， window.innerWidth: 都是获取viewPort大小的
  - window.outerWidth, widnow.outerHeight：获取包括工具栏的窗口大小
  - window.devicePixelRatio: 重要。获取物理像素和逻辑像素比值

- screen
  - screen.width, scereen.height
  - screen.availWidth: screen.availHeight: 获取包含屏幕中物理按键的情况

- window.open：打开一个窗口
  - window.moveBy，moveTo， resizeTo， resizeBy：都是改变window.open中的窗口信息

- Scroll
  - scrollTop,scrollLeft

重要：getClientRects：获取多个盒子的信息
  getBoundingClientRect: 获取一个盒子信息


### API标准

来自标准化组织。

- Khronos - webgl
- Ecma - ecmasciript
- WHATWG - HTML
- W3C：webaudio 等其他主要标准来源（分为社区组CG，工作组WG，兴趣组IG）

