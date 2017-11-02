# notes
使用weex框架时遇到的坑与解决方法

### weex create 构建项目 修改webpack 自定义入口文件
> src里新建一个entry.js，entry.js为入口，文件名随便取

>webpack.config.js找到
const entry = {} 这里配置入口 const entry =pathTo.resolve('./src/entry.js');

>同理
const weexEntry = pathTo.resolve('./src/entry.js');

### weex使用stream模块发送text类型的'POST'请求问题

> text类型请求，返回的数据是json类型，在app上需通过json.parse（res）转换后方可使用，
>而使用axios发送的form类型请求，返回数据在web上无需转换可以直接使用

### 判断当前使用的平台
``` javascript
  if (WXEnvironment.platform == 'Web') {
    modal.toast({ message: 'web端' })
    Vue.prototype.$http = myAxios
  } else {
    modal.toast({ message: 'app' })
    Vue.prototype.$http = appRequire
  }
```
>不同的平台使用不同的请求方式
