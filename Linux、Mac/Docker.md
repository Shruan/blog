# Docker 常用指令

#### docker安装指令
```
  brew cask install docker
```

#### 可安装镜像查询
```
  docker search centos // 可安装centos镜像
  docker search tomcat
```

#### 安装镜像
```
  docker pull centos
```

#### 查看已安装镜像
```
  docker images
```

|      -     |     -       |
| :--------: | :----------:|
| REPOSITORY | 镜像的仓库源  |
| TAG        | 镜像的标签   |
| IMAGE ID   | 镜像ID       |
| CREATED    | 镜像创建时间  |
| SIZE       | 镜像大小      |


#### 启动指定镜像
```
  docker run -p 8080:8080 centos
```
  - -p 表示端口号，前一个8080是指我们访问tomcat时的端口号
  - 后一个8080是tomcat启动的一个容器在docker中运行的端口号

```
  docker run -p port1:port2 containerName:tag
  docker run -p 8080:8080 tomcat:last
```
  - last是指定的tomcat的标签，相同的镜像可以指定不同的标签以做区分

#### 查看运行中容器
```
  docker ps
```

| - | - |
| :--------:   | :------:|
| CONTAINER ID | 容器ID |
| IMAGE        | 镜像ID前四位 |
| COMMAND      | 在容器最后运行的命令 |
| CREATED      | 容器创建的时间 |
| STATUS       | 容器的状态 |
| PORTS        | 对外开放的端口号   
| NAMES        | 容器名    |
