### MongoDB基本用法
 - show dbs :显示已有数据库。
 - use admin： 进入数据，也可以理解成为使用数据库。
 - show collections: 显示数据库中的集合（关系型中叫表）。
 - db: 显示所在库的当前位置。

#### 基础命令
- db.集合.insert()   // 新建数据集合和插入文件（数据），当集合没有时，这时候就可以新建一个集合，并向里边插入数据.
```javascript
  db.user.insert({"name", "test"})
```

- db.集合.find()     // 查询所有数据
- db.集合.findOne()  // 查询第一个文件数据
- db.集合.update({查询},{修改})   // 修改文件数据，第一个是查询条件，第二个是要修改成的值。
```javascript
  db.user.update({"name":"test"},{"name":"test","age":"32"})
```

- db.集合.remove(条件)  // 删除文件数据
```javascript
  db.user.remove({"name": "test"})
```
- db.集合.drop()       // 删除整个集合。
- db.dropDatabase()   // 删除整个数据库，在删除库时，一定要先进入数据库，然后再删除。

#### js执行mongo命令
```javascript
  let userName = "test"       
  let timeStamp = Date.parse(new Date())
  let data={"loginUnser": userName,"loginTime": timeStamp}
  var db = connect('test')  //连接数据库 需要使用var来申明！！！
  db.login.insert(data) //插入数据

  print('[test]print success') //没有错误显示成功
```
