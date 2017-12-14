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
