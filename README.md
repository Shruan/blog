# notes
保存一些平时遇到的问题及整理的解决方案

[文章](./Others/文章博客.md)  
[知识点](./principle（原理）/知识点记录.md)  
[weex相关记录](./weex-notes/README.md)   
[CSS相关记录](./web-notes/css/README.md)  
[Linux服务器相关配置](./Linux、Mac/Linux.md)

### cnpm使用
> 安装cnpm   
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

> cnpm免安装使用
$ npm install vant --save --registry=https://registry.npm.taobao.org

### js 判断对象是否为空的三种方法
 - for...in...遍历属性，为真则为“非空数组”；否则为“空数组”  
 ```javascript
  function judgeObj (obj) {
    for (var variable in object) {
      return true
    }
    return false
  }
 ```
  - 通过JSON自带的.stringify方法来判断
  ```javascript
   if (JSON.stringify(obj) == '{}') {
     console.log('空')
   }
  ```
  - ES6新增的特效 Object.keys()
  ```javascript
   if (Object.keys(obj).length > 0) {
     console.log('非空')
   } else {
     console.log('空')
   }
  ```

###  mac 新版本谷歌浏览器 跨域指令
<pre><code>
  open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/qiushiyuan/MyChromeDevUserData/
</pre></code>

### img和background的区别
>图片的展示方式有两种，一种是以图片标签显示，一种是以背景图片显示。  

>img：html中的标签img是网页结构的一部分会在加载结构的过程中和其他标签一起加载。  

>background：以css背景图存在的图片background会等到结构加载完成（网页的内容全部显示以后）才开始加载也就是说，网页会先加载标签img的内容，再加载背景图片background引用的图片。  

>引入一张图片，那么在这个图片加载完成之前，img后的内容不会显示。而用background来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，网页内容能正常浏览，但是看不到背景图片。至于这两种，大家按照习惯，需求等权重因素选择！不太重要的图片用背景来加载，重要的图片要用img优先加载。

### 使用vue+webpack打包遇到icon小图标路径问题不显示图标问题  
##### 解决方法如下：
>在build目录下新建一个cssPathResolver.js，内容如下：

``` javascript
module.exports = function (source) {　　  
　　if (process.env.NODE_ENV === 'production') {    
　　　　return source.replace('__webpack_public_path__ + "static', '"..')  
　　} else {  
　　　　return source  
　　}  
}   
```

>loader要用在被css引入的资源上，而不是css，在webpack.base.conf.js里面修改下，例如在我的项目里是为了解决iconfont路径不对的问题，我是这样用的：

``` javascript
｛  
　　test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,  
　　loaders: [  
　　{  
　　　　loader: path.resolve(__dirname, 'cssPathResolver')  
　　},  
　　{  
　　　　loader: 'url-loader',  
　　　　query: {  
　　　　　　limit: 10000,  
　　　　　　name: utils.assetsPath('icons/[name].[hash:7].[ext]')
　　　　}  
　　　}  
　　]  
 }
```
