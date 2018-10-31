# Docker 常用指令

### docker安装指令（ Mac版 ）
```bash
  $ brew cask install docker
```

### 可安装镜像查询
  - [镜像市场](https://store.docker.com)
  - 命令行
  ```bash
    $ docker search centos // 可安装centos镜像
    $ docker search tomcat
  ```

### 构建镜像
  - 安装已有镜像
  ```bash
    $ docker pull centos
  ```

  - 通过[dockerfile](./dockerfile)构建镜像
  ```bash
    $ docker build -t="REPOSITORY:TAG" dockerfile_path
    $ docker build -t="shruan/node:test" .
  ```

### 查看已安装镜像
```bash
  $ docker images
```

|      -     |     -       |
| :--------: | :----------:|
| REPOSITORY | 镜像的仓库源  |
| TAG        | 镜像的标签   |
| IMAGE ID   | 镜像ID       |
| CREATED    | 镜像创建时间  |
| SIZE       | 镜像大小      |


### 删除镜像（rmi）
```bash
  $ docker rmi IMAGEID
  $ docker rmi 41a54fe1f79d
```
  - 删除前需要保证容器是停止的
  - 删除前需先删除容器

### 通过镜像构建一个容器（run）
```bash
  $ docker run -p port1:port2 --name NAMES containerName:tag/imageID -e ENV="dev"
```
  - -p 表示端口号
    - port1 是指我们访问tomcat时的端口号
    - port2 是tomcat启动的容器在docker中运行的端口号
  - --name 表示构建容器的名称
  - -e docker的环境变量
  - containerName:tag 是指定 仓库源:标签，相同的镜像可以指定不同的标签以做区分
  - imageID 是镜像ID

```bash
  $ docker run -p 8080:8080 centos
  $ docker run -p 8080:8080 --name smytest tomcat:last
```

### 查看容器（ps）
```bash
  $ docker ps    // 运行中
  $ docker ps -a // 所有容器
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
  ```bash
    $ docker start containerID/NAMES // 容器ID 或者 容器名
    $ docker start smytest
  ```

  - 停止容器
  ```bash
    $ docker stop containerID/NAMES
    $ docker stop smytest
  ```

  - 重启容器
  ```bash
    $ docker restart containerID/NAMES
    $ docker restart smytest
  ```

  - 删除容器
  ```bash
    $ docker rm containerID/NAMES
    $ docker rm smytest
  ```

  - 复制文件到容器中
  ```bash
    $ docker cp file_path containerID/NAMES:path
    $ docker cp /ROOT.var smytest:/usr/local/webapps/
  ```

  - 复制容器中文件到本地
  ```bash
    $ docker cp containerID/NAMES:path local_path
    $ docker cp smytest:/usr/local/ /home/
  ```

  - 进入已经启动的容器
  ```bash
    $ docker exec -i -t containnerID/NAMES /bin/bash
    $ docker exec -i -t smytest /bin/bash
  ```

### 将容器转化为镜像（commit）
```bash
  $ docker commit -m Instructions -a Author containerID/NAMES REPOSITORY:TAG
  $ docker commit -m "docker test" -a "Shruan" smytest shruan/tomcat:1.0.0
```

### 将镜像打包（save）
```bash
  $ docker save -o path/filename REPOSITORY:TAG/IMAGEID
  $ docker save -o /Users/qiushiyuan/docker/smytest.v1.0.0.tar shruan/tomcat:1.0.0
```

### 将包恢复成镜像（load）
```bash
  $ docker load path/filename
  $ docker load /Users/qiushiyuan/docker/smytest.v1.0.0.tar
```
