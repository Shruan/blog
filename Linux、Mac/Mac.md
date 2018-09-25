# Mac 相关配置

## apache2配置
> mac自带了php运行环境，预装php,apache，打开终端，输入sudo apachectl start，浏览器输入localhost，如果能显示“It Works!”，那就work了。
#### 基本命令  
查看apache版本 指令
> sudo apachectl -v  
> sudo httpd -v  

启动Apache服务
> sudo apachectl start

重新启动Apache服务  

> sudo apachectl restart  

关闭Apache服务  

> sudo apachectl stop
#### 本地仓库路径修改
1 、 vi /etc/apache2/httpd.conf  
2 、 修改文件配置：  
```
# DocumentRoot "/Library/WebServer/Documents"   ---默认路径
DocumentRoot "/Users/qiushiyuan/Sites"          ---修改后的路径
<Directory "/Users/qiushiyuan/Sites">  
```
3 、 开启相关配置   
> LoadModule userdir_module libexec/apache2/mod_userdir.so  
> LoadModule php7_module libexec/apache2/libphp7.so  

4 、 在 Options FollowSymLinks Multiviews 后添加 Indexes  

>即 Options FollowSymLinks Multiviews Indexes  

5 、 在路径 /etc/apache2/users 下创建新路径相关配置 例如 “你的名字”.conf，若不存在则新增一个并赋予权限
> chmod 777 xxx.conf
```
<Directory "/Users/qiushiyuan/Sites/">
    Options Indexes MultiViews
    AllowOverride None
    Require all granted
</Directory>
```

## MYSQL 基本命令
#### 重置root密码
1.关闭MySQL  
> 系统偏好设置->MySQL->Stop MySQL Server  

2.启动MySQL  
> 打开终端：sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables
点击回车，MySQL会自动开启  

3.设置新密码
```
/usr/local/mysql/bin/mysql   进入mysql命令模式
use mysql                    进入mysql数据库
flush privileges;
set password for 'root'@'localhost'=password('新密码');
```
4.配置环境变量
```Linux
# vim /etc/profile // 打开 全局 环境变量文件
# vim ~/.bash_profile // 打开 个人 环境变量文件
export PATH=/usr/local/mysql/bin:$PATH  // 配置mysql环境变量

#source /etc/profile  // 立即生效请运行：
<!-- #source ~/.bash_profile  // 立即生效请运行 -->
```

5.重启终端后配置的及时生效

```
# vim ~/.zshrc // 重启终端后执行指令

// 在~/.zshrc文件最后，增加一行：
source /etc/profile  // 立即生效请运行
```

## PHP 7
#### php.ini 配置
除下面配置语句的注释 ”;”

  > extension=php_mysqli.dll

这样仍然无法找到mysqli的类，还需要让php.exe能找到扩展文件
所有的默认扩展都在php目录下的ext目录下，php.ini中有一段配置，去掉注释”;”  

```
; Directory in which the loadable extensions (modules) reside.
; http://php.net/extension-dir
; extension_dir = "./"
; On windows:
extension_dir = "ext"
```

#### 配置android 快速开启emulator指令
```
# vim /etc/profile  // 打开环境变量文件
export PATH=/Users/qiushiyuan/Library/Android/sdk/emulator:$PATH

#source /etc/profile  // 立即生效请运行：
```
- 使用方式
```
emulator -list-avds // 查看模拟设备列表

// 启动某个模拟设备
emulator @AVD_name
emulator @Pixel_API_23
emulator -avd @Pixel_API_23
```
