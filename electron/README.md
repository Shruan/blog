#### 使用方式
* 链接c++库使用ffi和ref配合
* 指针使用ref进行类型转化，若需要通过指针加长度读取内容则传入char**进行内容操作后在nodejs使用readPointer读出定长内容


#### mac动态库
* 修改链接动态库路径：
    ```
    install_name_tool -change 原链接路径 现链接路径 现动态库文件路径
    ```


* 修改默认查找库路径：
    ```
    install_name_tool -id 默认查找库路径 现动态库文件路径
    ```

* @loader_path：加载路径的相对路径
* 注：electron不知道可执行文件的相对路径情况下，可以通过绝对路径加载主库然后修改依赖库路径为“@loader_path/依赖库.dylib”进行依赖库的链接

* libRawToJpg.dylib的mac支持版本为10.14及以上版本，低版本无法使用

#### win链接dll
* 错误码常见情况 
* Win 126：找不到指定库（可能为中文路径问题）；127：找不到指定函数；193：32位和64位用混了

* 链接使用的系统库使用depends进行核对（注：depends在win10下有问题，建议在win7下进行依赖库核对）


##### libjpeg-turbo
* 在Win下编译后x86和x64的头文件存在差异

	
* 四个静态库：
* turbojpeg.lib需配合动态库使用，为动态库链接指引
* turbojpeg-static.lib静态库可直接编译使用，比jpeg-static.lib的性能更加高效
* jpeg.lib需配合动态库使用，为动态库链接指引
* jpeg-static.lib静态库可直接编译使用

- 源码地址 https://github.com/libjpeg-turbo/libjpeg-turbo


- mac及centos编译
- `cmake -G"Unix Makefiles" -DCMAKE_INSTALL_PREFIX=xxx	-DCMAKE_INSTALL_PREFIX选项指定安装目录`
- `make & make install`

#### 编译规则
- 各平台CMake 

#### nodejs与C++交互时支持中文路径方式
```javascript
/**
* 字符串转换为 unicode 格式
* @param text
* @returns {Buffer}
*/
export function toUnicode (text) {
  return Buffer.from(`${text}\0`, 'ucs2')
}
```


#### windows下中文路径问题
- windows中文版默认编码为gbk，因此fopen路径时使用gdk方式解析nodejs传入的utf-8中文路径会导致乱码，因此获取到utf-8中文路径后需要转为unicode编码，再由unicode编码转为gbk编码才可正常读取到相应的中文路径信息内容
- Glib::KeyFile读取配置文件传入gtf-8编码则可读取出对应中文路径下配置文件信息

#### 本地化安全措施
- linux和macos下使用strip -x 去除符号信息
- 模型文件自带加密
- windows下dll可选择使用vmp加壳进行加密（影响性能，因此暂不建议使用）
