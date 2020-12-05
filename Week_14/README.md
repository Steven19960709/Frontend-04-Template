# 学习笔记

触屏：start move end

鼠标：donw move up

支持手势区分。抽象。

容错范围：10px

tap：点

pan：移动

flick：滑动

press：按

touchstart: identifier,唯一标识符。表示touch的唯一id

若果无法正常触发end事件（alert，被打断），将会触发cancel事件。

抽象出四个函数出来，分别处理动作。

!开根号的运算比较慢,可以使用目标函数的平方是否大于小于来计算