### 从输入URL到页面加载的过程   [转](http://www.dailichun.com/2018/03/12/whenyouenteraurl.html)  

[本题出处](http://fex.baidu.com/blog/2014/05/what-happen/)

## 大纲
- 对知识体系进行一次预评级
- 为什么说知识体系如此重要？
- 梳理主干流程
- 从浏览器接收url到开启网络请求线程
  > - 多进程的浏览器
  > - 多线程的浏览器内核
  > - 解析URL
  > - 网络请求都是单独的线程
  > - 更多

- 开启网络线程到发出一个完整的http请求
  > - DNS查询得到IP
  > - tcp/ip请求
  > - 五层因特网协议栈

- 从服务器接收到请求到对应后台接收到请求
  > - 负载均衡
  > - 后台的处理

- 后台和前台的http交互
  > - http报文结构
  > - cookie以及优化
  > - gzip压缩
  > - 长连接与短连接
  > - http 2.0
  > - https

- 单独拎出来的缓存问题，http的缓存
  > - 强缓存与弱缓存
  > - 缓存头部简述
  > - 头部的区别

- 解析页面流程
  > - 流程简述
  > - HTML解析，构建DOM
  > - 生成CSS规则
  > - 构建渲染树
  > - 渲染
  > - 简单层与复合层
  > - Chrome中的调试
  > - 资源外链的下载
  > - loaded和domcontentloaded

- CSS的可视化格式模型
  > - 包含块（Containing Block）
  > - 控制框（Controlling Box）
  > - BFC（Block Formatting Context）
  > - IFC（Inline Formatting Context）
  > - 其它

- JS引擎解析过程
  > - JS的解释阶段
  > - JS的预处理阶段
  > - JS的执行阶段
  > - 回收机制
  > - 其它
  > - 总结

> - 对浏览器模型有整体概念，知道浏览器是多进程的，浏览器内核是多线程的，清楚进程与线程之间得区别，以及输入url后会开一个新的网络线程
> - 对从开启网络线程到发出一个完整的http请求中间的过程有所了解（如dns查询，tcp/ip链接，五层因特网协议栈等等，以及一些优化方案，如dns-prefetch）
> - 对从服务器接收到请求到对应后台接收到请求有一定了解（如负载均衡，安全拦截以及后台代码处理等）
> - 对后台和前台的http交互熟悉（包括http报文结构，场景头部，cookie，跨域，web安全，http缓存，http2.0，https等）
> - 对浏览器接收到http数据包后的解析流程熟悉（包括解析html，词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、里面可能还包括复合图层的合成、GPU绘制、外链处理、加载顺序等）


## 前端向知识的重点
- 核心知识，必须掌握的，也是最基础的，譬如浏览器模型，渲染原理，JS解析过程，JS运行机制等，作为骨架来承载知识体系

- 重点知识，往往每一块都是一个知识点，而且这些知识点都很重要，譬如http相关，web安全相关，跨域处理等

- 拓展知识，这一块可能更多的是了解，稍微实践过，但是认识上可能没有上面那么深刻，譬如五层因特网协议栈，hybrid模式，移动原生开发，后台相关等等（当然，在不同领域，可能有某些知识就上升到重点知识层次了，譬如hybrid开发时，懂原生开发是很重要的）

## 梳理主干流程
1. 从浏览器接收url到开启网络请求线程（这一部分可以展开浏览器的机制以及进程与线程之间的关系）
2. 开启网络线程到发出一个完整的http请求（这一部分涉及到dns查询，tcp/ip请求，五层因特网协议栈等知识）
3. 从服务器接收到请求到对应后台接收到请求（这一部分可能涉及到负载均衡，安全拦截以及后台内部的处理等等）
4. 后台和前台的http交互（这一部分包括http头部、响应码、报文结构、cookie等知识，可以提下静态资源的cookie优化，以及编码解码，如gzip压缩等）
5. 单独拎出来的缓存问题，http的缓存（这部分包括http缓存头部，etag，catch-control等）
6. 浏览器接收到http数据包后的解析流程（解析html-词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、复合图层的合成、GPU绘制、外链资源的处理、loaded和domcontentloaded等）
7. CSS的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC等概念）
9. 其它（可以拓展不同的知识模块，如跨域，web安全，hybrid模式等等内容）

### 从浏览器接收url到开启网络请求线程
###### 这一部分展开的内容是：浏览器进程/线程模型，JS的运行机制
- 多进程的浏览器

  浏览器是多进程的，有一个主控进程，以及每一个tab页面都会新开一个进程（某些情况下多个tab会合并进程）  
  进程可能包括主控进程，插件进程，GPU，tab页（浏览器内核）等等
  > - Browser进程：浏览器的主进程（负责协调、主控），只有一个
  > - 第三方插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建
  > - GPU进程：最多一个，用于3D绘制
  > - 浏览器渲染进程（内核）：默认每个Tab页面一个进程，互不影响，控制页面渲染，脚本执行，事件处理等（有时候会优化，如多个空白tab会合并成一个进程）

- 多线程的浏览器内核

  每一个tab页面可以看作是浏览器内核进程，然后这个进程是多线程的，它有几大类子线程
  > - GUI线程
  > - JS引擎线程
  > - 事件触发线程
  > - 定时器线程
  > - 网络请求线程

  