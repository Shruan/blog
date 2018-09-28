# Docker 常用指令

### docker安装指令
```
  brew cask install docker
```

### 可安装镜像查询
```
  docker search centos // 可安装centos镜像
  docker search tomcat
```

### 安装镜像
```
  docker pull centos
```

### 查看已安装镜像
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


### 删除镜像
```
  docker rmi IMAGEID
  docker rmi 41a54fe1f79d
```
  - 删除前需要保证容器是停止的
  - 删除前需先删除容器

### 通过镜像产生一个容器
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

### 查看容器
```
  docker ps    // 运行中
  docker ps -a // 所有容器
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

#### 容器常用指令
  - 启动已有的容器
  ```
    docker start containerID/NAMES // 容器ID 或者 容器名
    docker start gallant_fermat
  ```

  - 停止容器
  ```
    docker stop containerID/NAMES
    docker stop gallant_fermat
  ```

  - 重启容器
  ```
    docker restart containerID/NAMES
    docker restart gallant_fermat
  ```

  - 删除容器
  ```
    docker rm containerID/NAMES
    docker rm gallant_fermat
  ```

  - 复制文件到容器中
  ```
    docker cp src_path NAMES:path
    docker cp /smy.var gallant_fermat:/usr/local/
  ```
