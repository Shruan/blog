
### [环境准备](https://juejin.im/post/6854573212341108749)
在安装依赖之前，先做些准备工作。因为 安装 ffi_napi 依赖的时候，需要有编译环境，否则会因为无法编译而报错。

#### 添加配置，被保存到了 <windows用户主目录>/.npmrc  配置文件中
```shell
npm set registry https://registry.npm.taobao.org/
npm set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
npm set SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass
npm set PYTHON_MIRROR http://npm.taobao.org/mirrors/python
```

#### 非必须，备以后使用
```shell
npm i chromedriver -g --chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver
```

#### 使用Vue Cli创建vue项目的时候会用到
```shell
npm i -g node-sass
```

#### NodeJS 编译 C/C++ 依赖用到
```shell
npm i -g node-gyp
```
必须使用yarn，开发环境才可启动客户端
```shell
brew install yarn
```

#### windows 编译工具
> 需要用管理员身份运行 PowerShell，如果 报错 Could not install Visual Studio Build Tools. 则到 `C:\Users\wuqing\.windows-build-tools` 目录下 手工进行安装，安装成功后在执行上面的命令

```shell
npm i -g --production windows-build-tools
```

#### 安装Python，注意必须是 2.7 版本，安装后并设置环境变量

> “我的电脑”->“属性”->“高级系统设置”-->“环境变量”

### 安装electron
  `vue add electron-builder`

### [踩坑记录](./record.md)

### [DLL库相关](./ffi.md)
