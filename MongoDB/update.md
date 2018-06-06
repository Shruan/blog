### 更新数据

#### （错误）使用
- 基础更新 会覆盖原有数据（存在问题）
```javascript
  // 原数据  { name: 'test', sex: 1 }
  // 新数据  { sex: 0 }
  var db = connect('company')
  db.test.update({name: 'test'},{sex: 0})

  print('[update]: The data was updated successfully')
```
#### update修改器
db.集合.update(条件, 修改数据, 配置)
- $set 修改器 （可以修改嵌套数据）
```javascript
  db.test.update({"name": "test"}, { $set: {"skill.technology": '前端开发' }})
  // 数据
  {
    name: 'test',
    skill: {
      // technology: '小白'  // 原数据
      technology: '前端开发'  // 新数据
    }
  }
```

- $unset 用于将key删除
```javascript
  // {
  //   name: 'test',
  //   skill: {
  //     technology: '小白'
  //   },
  //   age: 24 // 原数据
  // }
  db.test.update({"name": "test"}, { $unset:{"age": ''} })
  // 新数据
  // {
  //   name: 'test',
  //   skill: {
  //     technology: '小白'
  //   }
  // }
```

- $inc 对数字进行计算
```javascript
  db.test.update({"name": "test"}, { $inc: {"age": -2} })
  // 数据
  {
    name: 'test',
    // age: 24    // 原数据
    age: 22    // 新数据
  }
  ```

- 配置项——multi选项 （true or false 是否批量更新）
```javascript
  db.test.update({}, { $set: { interest: [] } }, { multi: true })
```

- 配置项——upsert选项 （true or false 是否强制添加）
  - upsert也有两个值：true代表条件没有结果时添加，false代表条件没有结果时不添加(默认值)。
```javascript
  db.test.update({}, { $set: { interest: [] } }, { upsert: true })
```

- $push 追加数组/内嵌文档值 （可以修改嵌套数据）
```javascript
  db.test.update({"name": "test"}, { $push: {"skill.interest": '学习' }})
  // 数据
  {
    name: 'test',
    // interest: []      // 原数据
    interest: ['学习']   // 新数据
  }
```

- $each 批量追加数组/内嵌文档值 （可以修改嵌套数据）
```javascript
  let arr = ['敲代码', '学习', '休息']
  db.test.update({"name": "test"}, { $each: {"skill.interest": arr }})
  // 数据
  {
    name: 'test',
    interest: []  // 原数据
    interest: ['敲代码', '学习', '休息'] // 新数据
  }
```

- $pop 删除数组值 (参数 1、 -1)
  -  1：从数组末端进行删除
  - -1：从数组开端进行删除
```javascript
  db.test.update({"name": "test"}, { $pop: { interest: 1 } }})
  // 数据
  {
    name: 'test',
    // interest: ['敲代码', '学习', '休息']  // 原数据
    interest: ['敲代码', '学习'] // 新数据
  }
```

- 数组定位修改 (从0开始)
```javascript
  // 修改数组第二位
  db.test.update({"name": "test"}, { $set: { 'interest.2': '测试' } }})
  // 数据
  {
    name: 'test',
    // interest: ['敲代码', '学习', '休息']  // 原数据
    interest: ['敲代码', '学习', '测试']  // 新数据
  }
```

- $addToSet 没有则添加，有则不添加
```javascript
  db.test.update({"name": "test"}, { $addToSet: { 'interest': '测试' } }})
  // 数据
  {
    name: 'test',
    // interest: ['敲代码', '学习', '休息']  // 原数据
    interest: ['敲代码', '学习', '休息', '测试'] // 新数据
  }
```
