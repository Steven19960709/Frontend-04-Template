# 学习笔记

## CSS排版

1. DOM里头存储的是node，不仅仅是元素，因为结点如注释节点不是元素，DTD信息也不是元素。

2. CSS选择器选择的是元素或伪元素，选出来的是一个盒子或则多个盒子

3. 和模型排版时是多层结构。盒模型分为content-box，border-box。通过box-sizing来设置。

border-box：width=content+pandding

content-box：width=content+border+padding

## 布局

1.正常流，第一代布局，BFC，IFC。

  - 收集盒进行
  - 计算盒子在行重的排列
  - 计算行排布

2.flex

3.grid

4.hodiny：可以通过js直接干预的第四代排版技术

BFC：块级格式化上下文

IFC：行内格式化上下文

BFC合并：通过设置BFC来解决margin折叠的问题，margin-collage，也称为边距折叠

边距折叠：只会发生在正常流的BFC中


border-level：外边有BFC的盒子

border-contener：里边是BFC的盒子
  
  block-container：block，disable-cell，grid-cell，flex-cell等

boder box：里外都是BFC


