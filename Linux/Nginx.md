# Nginx

### [安装](https://blog.csdn.net/qq_30038111/article/details/79410354)

#### 安装 gcc
  - Nginx的编译环境
```bash
  $ yum install gcc-c++
```

#### 安装 pcre pcre-devel
  - nginx 的 http 模块使用 pcre 解析正则表达式，所以安装 perl 兼容的正则表达式库
  ```bash
    $ yum install -y pcre pcre-devel
  ```

#### 安装 zlib
  - nginx 使用 zlib 对 http 包的内容进行 gzip
  ```bash
    $ yum install -y zlib zlib-devel
  ```

#### 安装 Open SSL
  - nginx 不仅支持 http 协议，还支持 https（即在 ssl 协议上传输 http），如果使用了 https ，需要安装 OpenSSL 库
  ```bash
    $ yum install -y openssl openssl-devel
  ```

#### Nginx安装

```bash
  $ wget http://nginx.org/download/nginx-1.9.9.tar.gz
  $ tar -zxvf nginx-1.9.9.tar.gz
  $ cd nginx-1.9.9
  $ ./configure
  & make && make install
```
#### 配置环境变量
```bash
  $ vim /etc/profile // 打开 全局 环境变量文件
  # vim ~/.bash_profile // 打开 个人 环境变量文件
  export NGINX_HOME=/usr/local/nginx
  export PATH=$PATH:$NGINX_HOME/sbin  // 配置Nginx环境变量

  $ source /etc/profile  // 立即生效请运行：
```

### Nginx 常用指令
- 启动
  ```bash
    $ nginx
    # /usr/local/nginx/sbin
  ```

- 查看nginx进程
  ```bash
    $ ps -ef | grep nginx
  ```

- 关闭
  ```bash
    $ nginx -s stop
  ```
- 重启
  ```bash
    $ nginx -s reload
  ```

- 测试 nginx 配置脚本是否运行正常
  ```bash
    $ nginx -t
  ```
