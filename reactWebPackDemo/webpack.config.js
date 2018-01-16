const path = require('path')
module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'temp'
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
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
