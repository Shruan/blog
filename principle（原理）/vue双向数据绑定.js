// 观察者模式
function observer (data) {
  if (!data || typeof data !== 'object') return

  for (let key in data) {
    dataDefineProperty(data, key, data[key])
  }
}

function dataDefineProperty (data, key, value) {
  observer(value)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能再define
    get: function () {
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set: function (newValue) {
      console.log('监听到变化：旧值' + value + '，新值' + newValue)
      value = newValue
      dep.notify()
    }
  })
}

// 消息订阅器
function Dep () {
  this.subs = []
  console.log(this.subs)
}
Dep.prototype = {
  // 添加订阅者
  addSub: function (sub) {
    this.subs.push(sub)
  },
  // 向订阅者发起通知
  notify: function () {
    this.subs.forEach(item => {
      item.update()
    })
  }
}

// 观察者
function Watcher (vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.get()
}
Watcher.prototype = {
  update: function () {
    // 数据更新通知
    console.log('接到通知。。')
    this.run()
  },
  run: function () {
    let value = this.get()
    this.cb(value)
  },
  get: function () {
    Dep.target = this
    let value = this.vm[this.exp]
    Dep.target = null
    return value
  }
}

// 例子
let data = {name: 'shy'}
observer(data)

new Watcher(data, 'name', () => {
  // 监听变化后操作
})
