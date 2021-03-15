### 踩坑记录
* js-cookie无法使用，使用electron的session模块代替

* builder插件版本会导致编译问题导致import无法再渲染层使用，建议使用合适版本

* 开发环境运行客户端需安装yarn
  > brew install yarn
  
  > 环境存在yarn.lock文件，本地环境无yarn环境时不执行electron服务

* Mac和window环境路径结构不一致
  > Mac：/   
  > window：\
  
  > 使用path.sep来获取分隔符

* electron无法使用web worker

* mac未配置签名报错
    ```shell
    vim ~/.bash_profile
    add export CSC_IDENTITY_AUTO_DISCOVERY=false.
    source ~/.bash_profile
    ```

* 内存泄露问题（vuex可能存在）

* sqlit3不同进程同时处理会可能会出现死锁问题，建议单一进程处理sql

* http node环境在部分系统需要校验agent证书，否则无法发送请求
  >（Error: unable to verify the first certificate）  
  
  > 解决方案：配置证书或者不校验 

  ```javascript
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  ```

* window系统需要主动打包时配置获取权限，否则可能造成打开客户端时部分功能无权限报错（但是存在拖拽功能无法使用问题）

* Mac系统自动更新需要新安装包包含证书，否则更新自动更新失败

* node环境下http需要主动配置 body大小限制，否则body过大（大于10M）会导致请求异常
    ```javascript
      config: {
        maxContentLength: 73400500,
        maxBodyLength: 73400500
      }
    ```
* drop事件e.dataTransfer.files使用forEach遍历报错（使用for of代替）
