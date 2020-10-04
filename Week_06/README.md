# 学习笔记

## 有限状态机

有限状态机处理字符串。

### 概念

每一个状态都是一个机器，可以做计算，存储，输出。

  状态机的每一个机器本身没有状态，如果用函数来表示的话，他应该是纯函数（无副作用）
  状态机的每一个输入都是一致的

每一个机器都知道下一个状态。
  
  每个机器都有确定的下一个状态（Moore），摩尔型状态机
  每个机器根据输入决定下一个状态（Mealy），米莉型状态机，最常用

js中的有限状态机（Mealy）

  // 每个函数都是一个状态
  function state (input) {
    return next
  }

  while (input) {
    state = state(input) // 把状态机的返回值作为下一个状态
  }

## 浏览器工作原理 

### http请求解析

七层网络模型:应用层,表示,会话(http都可以做前三层),传输(TCP,UDP),网络(Internet, intranet),数据联络,物理层

### TCP 和 IP

TCP: 流,端口, require('net')

IP:包,IP地址,libnet(构造IP包并且发送)/libpcap(从网卡抓包),唯一标识连入网络的地址

HTTP:文本型协议(相对于二进制协议来说),都是字符串构成的,比如说,要传1的话,就是通过传阿斯克码之类的

Request,Response.先由客户端发起request,再由服务端接收

Request-line

Method: POST/GET 协议版本

HOST, Content-Type: application/x-www-form-urlencoded headers

response格式。chunkBody，node默认返回格式。由16进制数字单独占一行，然后后边借着内容

    26
    <html><body>hello world</body></html>
    0

