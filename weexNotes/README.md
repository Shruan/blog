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

### weex使用stream模块发送'Get'请求存在的问题
> 若发送get请求时，url上的字段值带中文汉子，在浏览器上会将url自动调用encodeURI()将url中字符串作为URI进行编码  

> 而app端则需要自己手动调用encodeURI()进行编码，否则会因中文为转行格式导致发送请求出错
```
let url = this.apiUrl + '/XXXX?keyWord=搜索'
url = encodeURI(url)
```

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
