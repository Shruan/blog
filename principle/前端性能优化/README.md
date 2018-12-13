## 前端性能优化
  > - 1、资源压缩合并，减少http请求  
  > - 2、非核心代码异步加载 -> 异步加载的方式 -> 异步加载的区别  
  > - 3、利用浏览器缓存 -> 缓存分类 -> 缓存的原理  
  > - 4、静态资源CDN加速
  > - 5、DNS预解析
  > - 6、Service Worker
  > - 7、Web Workers
  > - 8、其他优化方式

#### 资源压缩合并，减少http请求
  - gzip压缩
  - 图片合并
    - 图片、图标应先压缩合并，部署其他前静态资源前也应先压缩，使用CDN优化加载效率、
    - 上传图片等资源压缩后再上传  
  ...

#### 非核心代码异步加载
  - 动态加载脚本
    - 异步子组件优化页面加载时长
    ```javascript
      Vue.component(
        'async-webpack-example',
        // 这个 `import` 函数会返回一个 `Promise` 对象。
        () => import('./my-async-component')
      )
    ```
    - 组件、模块通过懒加载或按需加载减少首屏加载时长（服务端渲染ssr也可以减少首屏渲染白屏时长）

  - defer（HTML解析完成之后执行，顺序执行）
  - async（加载完成之后立即执行，无顺序）

#### 利用浏览器缓存

  - http缓存（缓存部分数据，尽可能减少http请求）
    - 强缓存（200 from cache）时，浏览器如果判断本地缓存未过期，就直接使用，无需发起http请求
      > 设置请求头Cache-Control/Max-Age

    - 协商缓存（304）时，浏览器会向服务端发起http请求，然后服务端告诉浏览器文件未改变，让浏览器使用本地缓存
      > If-None-Match/E-tag

  - manifest静态资源缓存
    - 如果已有缓存资源，会与服务器最后修改时间对比，一致则返回304，直接使用已缓存资源
    - 优势：
      > - 离线浏览 - 用户可在应用离线时使用它们
      > - 速度 - 已缓存资源加载得更快
      > - 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源  

    - 实现原理
      ```html
        <html manifest="manifest.appcache"></html>
      ```
      ```js
        // 设置后面的文件为缓存
        CACHE:
        /static/js/app.js

        // 置后面的文件为不缓存（无法设置自身页面）
        NETWORK:

        // 置后面的文件错误或不存在的时候使用另一个文件(404页面)
        FALLBACK:
        /static/errpage.html

        // 可以设置fast或prefer-online两种模式
        SETTINGS:
      ```

#### 静态资源CDN加速
  - CDN 静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。  
  ...

#### DNS预解析
  - link 预解析网址
    ```html
      <link rel="dns-prefetch" href="//www.zhix.net">
    ```

  - meta 强制开启dns预解析
    ```html
      <!-- 浏览器中默认开启 dns预解析 -->
      <!-- https协议下中浏览器默认关闭 dns预解析 -->
      <meta http-equiv="x-dns-prefetch-control" content="on">
    ```

#### Service Worker
  - 介于服务器和网页之间的拦截器，能够拦截进出的HTTP 请求，从而完全控制你的网站。实现离线缓存。
  - 缓存资源，能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作，提高二次访问首屏速度，也为创建PWA（桌面WEB）的实现提供服务。
  - 特点：
    - 在页面中注册并安装成功后，运行于浏览器后台，不受页面刷新的影响，可以监听 - 和截拦作用域范围内所有页面的 HTTP 请求。
    - 网站必须使用 HTTPS。除了使用本地开发环境调试时(如域名使用 localhost)
    - 运行于浏览器后台，可以控制打开的作用域范围下所有的页面请求
    - 单独的作用域范围，单独的运行环境和执行线程
    - 不能操作页面 DOM。但可以通过事件机制来处理
    - 事件驱动型服务线程


#### Web Workers
  - 使用Web Workers分担部分计算密集型或高延迟的任务，主线程不会被阻塞或拖慢。
    ```javascript
      // 主线程
      let worker = new Worker('worker.js')
      worker.postMessage({ method: 'echo', args: ['Work'] }) // 主线程向worker线程发送数据

      worker.onmessage = function (event) {
        // 主线程监听worker线程返回数据
        console.log('Received message ' + event.data)
        worker.postMessage('Work done!')
      }

      // 错误处理
      worker.onerror(function (event) {
        console.log(event)
      })

      worker.terminate()  // 关闭worker线程
      ```
      ```javascript
      // worker 线程
      // 子线程监听主线程传输的数据
      self.addEventListener('message', function (e) {
        self.postMessage('You said: ' + e.data) // 向主线程发送数据
      }, false)

      self.close() // 关闭自身线程

      self.importScripts('script1.js') // 子线程加载其他js脚本
    ```

#### 其他优化方式
  - Object.freeze() 对象冻结减少CPU（observer）开销 [(源)](https://juejin.im/post/5b960fcae51d450e9d645c5f)
    > Object.freeze() 可以冻结一个对象，冻结之后不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

    > 当你把一个普通的 JavaScript 对象传给 Vue 实例的  data  选项，Vue 将遍历此对象所有的属性，并使用  Object.defineProperty  把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

    > Vue 在遇到像 Object.freeze() 这样被设置为不可配置之后的对象属性时，不会为对象加上 setter getter 等数据劫持的方法。

  - 减少重绘和回流，减少dom操作，使用className代替直接使用style编写样式、减少class选择器的层级嵌套、减少元素标签的使用

  - 尽可能少使用setInterval(会产生阻塞队列，使用setTimeout递归来模拟实现setInterval功能)、watch（变量不会被垃圾回收机制回收）等观察者模式的方法，避免滥用async、await异步函数（会产生阻塞队列）


  - 图片懒加载 / 图片预加载
    - 懒加载原理：先加载一张白块或低品质图片，当页面停止在可视范围后加载真实图片，滚动事件通过函数节流来控制
      ```html
        <img src="/static/img/white.jpeg" original="/static/img/realImage.png">
        <!--
          src 中为白块或低品质图片
          original 中为真实图片
          在可视范围时使用original中的真实图片地址替换src中的地址
         -->
      ```
