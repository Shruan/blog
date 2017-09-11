# notes
保存一些平时遇到的问题及查询到解决方案

###使用vue+webpack打包遇到icon小图标路径问题不显示图标问题  
#####解决方法如下：
>在build目录下新建一个cssPathResolver.js，内容如下：

module.exports = function (source) {　　  
　　if (process.env.NODE_ENV === 'production') {    
　　　　return source.replace('__webpack_public_path__ + "static', '"..')  
　　} else {  
　　　　return source  
　　}  
}   

>loader要用在被css引入的资源上，而不是css，在webpack.base.conf.js里面修改下，例如在我的项目里是为了解决iconfont路径不对的问题，我是这样用的：

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
　　　　　　name: utils.assetsPath('icons/[name].[hash:7].[ext]'),  
　　　　}  
　　　}  
　　]  
}  
