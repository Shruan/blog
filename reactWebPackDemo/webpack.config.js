const path = require('path')
module.exports = {
  entry: './app/index.js',  // 打包文件路径
  output: {
    filename: 'index.js', // 打包输出文件名
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'temp'  // 系统内存
  },
  devServer: {
    contentBase: './',  //文件访问基本路径
    host: 'localhost',
    compress: true, // 压缩
    port: 1717
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        query: {
          presets: ['es2015', 'react']  // 语法
        }
      }
    ]
  }
}
