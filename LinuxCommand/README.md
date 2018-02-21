# Linux服务器指令
#### 后台运行node项目：
<pre><code>
  nohup node xxx.js
</pre></code>

#### 查看进程：
<pre><code>
  // 查看所有进程
  ps -a

  // 查看指定项目pid
  ps aux|grep '项目名'

  // 杀死进程
  kill -9 pid
</pre></code>


#### 拷贝本地文件至服务器
- 从本地将文件传输到服务器
```
scp[本地文件的路径]   [服务器用户名]@[服务器地址]:[服务器上存放文件的路径]

scp /Users/mac/Desktop/test.txt root@192.168.1.1:/root
```
- 从本地将文件夹传输到服务器
<pre><code>
scp -r[本地文件的路径]   [服务器用户名]@[服务器地址]:[服务器上存放文件的路径]

scp -r /Users/mac/Desktop/test root@192.168.1.1:/root
</pre></code>

- 将服务器上的文件传输到本地
<pre><code>
scp [服务器用户名]@[服务器地址]:[服务器上存放文件的路径]   [本地文件的路径]

scp root@192.168.1.1:/root/default/test.txt /Users/mac/Desktop
</pre></code>

- 将服务器上的文件夹传输到本地
<pre><code>
scp -r [服务器用户名]@[服务器地址]:[服务器上存放文件的路径]   [本地文件的路径]

scp -r root@192.168.1.1:/root/default/test /Users/mac/Desktop
</pre></code>

#### Apache配置
- 安装
<pre><code>
  yum install httpd
</pre></code>

- 常用指令
<pre><code>
  systemctl start httpd.service           #启动
  apache systemctl stop httpd.service     #停止
  apache systemctl restart httpd.service  #重启
  apache systemctl enable httpd.service   #设置apache开机启动

  wget http://127.0.0.1                   #测试apache是否开启
</pre></code>
