# notes
保存一些平时遇到的问题及整理的解决方案

- [文章、博客](./Others/文章博客.md)  
- [知识点记录](./principle（原理）/知识点记录.md)  
- [Linux服务器相关配置](./Linux、Mac/Linux.md)  
- [Docker常用指令](./Linux、Mac/Docker.md)  
- [weex相关记录](./weex-notes/README.md)   
- [CSS相关记录](./web-notes/css/README.md)  

### cnpm使用
  - 安装cnpm   
  ```bash
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```

  - cnpm免安装使用
  ```bash
    $ npm install xxx --save --registry=https://registry.npm.taobao.org
  ```

###  mac 新版本谷歌浏览器 跨域指令
```bash
  $ open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/qiushiyuan/MyChromeDevUserData/
```
