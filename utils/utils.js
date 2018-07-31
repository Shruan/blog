/*
* 使用方法
* import { utils } from '@/coMethods/utils.js'
* utils.addClass(el, className)
*/

export const utils = {
  // ———————————————————————————————— Cookie相关操作 ————————————————————————————————————————
  // cookie 存储、查看、删除
  cookie: {
    set: function (name, value) {
      // 缓存过期时间
      let Days = 30
      let exp = new Date()
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
      document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
    },
    get: function (name) {
      let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      let reg = arr
      arr = document.cookie.match(reg)
      if (arr) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    del: function (name) {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1)
      let cval = this.get(name)
      if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
      }
    }
  },
  // —————————————————————————  Cookie相关操作（end） ———————————————————————————————————

  // ———————————————————————————————  数组去重  —————————————————————————————————————————
  // 数组本身去重
  simpleArr: function (arr) {
    return Array.from(new Set(arr))
  },
  /* 两复杂数组根据唯一值比较去重 */
  complexArr: function (arr1, arr2, key) {
    let keyArr = arr1.map(item => item[key])
    let newArr = arr2.filter(item => {
      return keyArr.indexOf(item[key]) !== -1
    })
    return newArr
  },
  // ———————————————————————————————  数组去重（end）  —————————————————————————————————————————

  // ———————————————————————————————  数据拷贝  —————————————————————————————————————————
  /* 任意数据拷贝 */
  deepCopy: function (data) {
    var target // 不能使用let 因为无法先声明在赋值
    if (!(data instanceof Object)) { // 返回基本类型
      return data
    } else if (data instanceof Array) {
      target = []
    } else if (data instanceof Object) {
      target = {}
    } else if( data instanceof Function) {
      target = eval(data)
    }
    for (let key in data) {
      target[key] = deepCopy(data[key])
    }
    return target
  },
  // —————————————————————————————  数据拷贝（结束） ———————————————————————————————————

  // ———————————————————————————————— DOM操作 ————————————————————————————————————————
  // 判断是否有该 class
  hasClass: function (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  },

  // 添加 class
  addClass: function (el, className) {
    if (this.hasClass(el, className)) return
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  },

  removeClass: function (el, className) {
    if (this.hasClass(el, className)) {
      el.className = el.className.replace(new RegExp( '(\\s|^)' + className + '(\\s|$)' ), ' ') // replace方法是替换
    }
  },
  // ———————————————————————————————— DOM操作（结束） —————————————————————————————————

  // ———————————————————————————————— URL操作 ————————————————————————————————————————
  // 拾取url后面带的参数 如a.html?key=aaaa&name=1232
  // 调用方式 var Request=new urlCatch() //实例化
  // alert(Request.wd)
  urlCatch: function () {
    var name ,value
    var obj = {}
    var str = location.href // 取得整个地址栏
    var num = str.indexOf('?')
    str = str.substr(num + 1) // 取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split('&') // 各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        obj[name] = value
      }
    }
    return obj
  },

  // 将对象类型转换为 key=aaaa&name=1232 类型
  urlFormat: function (data) {
    let changeData = ''
    for (let it in data) {
      if (changeData !== '') {
        changeData += '&'
      }
      changeData += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
    }
  }
  // ———————————————————————————————— URL操作(结束) ————————————————————————————————————————

  // ———————————————————————————————— 字符串操作 ————————————————————————————————————————————
  //删除字符串两把的空格
  trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },

  //删除左边的空格
  ltrim: function (str) {
    return str.replace(/(^\s*)/g, '')
　},

  //删除右边的空格
  rtrim: function (str) {
    return str.replace(/(\s*$)/g, '')
  },
  // ———————————————————————————————— 字符串操作(结束) ————————————————————————————————————————

  // ———————————————————————————————— 其他操作 —————————————————————————————————————————————
  // 加入收藏夹方法
  addFavorite: function () {
    var url = window.location
    var title = document.title
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('360se') > -1) {
      alert('由于360浏览器功能限制，请按 Ctrl+D 手动收藏！')
    } else if (ua.indexOf('msie 8') > -1) {
      window.external.AddToFavoritesBar(url, title) //IE8
    } else if (document.all) {
      try{
        window.external.addFavorite(url, title)
      } catch (e) {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!')
      }
    } else if (window.sidebar) {
      window.sidebar.addPanel(title, url, '')
    } else {
      alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!')
    }
  },

  // 监听键盘回车事件
  enterKeyDown: function () {
    window.document.onkeydown = (function (event) {
      console.log(this)
      var e = event || window.event
      if (e && e.keyCode == 13) { // 回车键的键值为13
        // this.seach()
        console.log('onkeydown')
      }
    }).bind(this)
  },

  // 产生指定概率的随机数
  // 数据格式：
  // arr = [{name: '一等奖', prob: 1}, {name: '二等奖', prob: 2}]
  probRandomNum: function (arr) {
    let random = Math.random()
    // 初始化概率值区间
    let lower = 0
    let upper = 0
    // 计算概率总值
  	let total = arr.map(item => item.prob).reduce((a, b) => a + b)
  	arr.forEach((item, index) => {
  		let nowIndex = index - 1
  		if (nowIndex >= 0) {
  			lower += arr[nowIndex].prob / total
  		}
  		upper += item.prob / total
  		if (lower < random && random < upper) {
  			console.log(item.name)
  		}
  	})
  }
  // ———————————————————————————————— 其他操作(结束) ————————————————————————————————————————

}
