/*
* 使用方法
* import { utils } from '@/coMethods/utils.js'
* utils.addClass(el, className)
*/

export const utils = {
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

 // 加入收藏夹方法
  addFavorite: function () {
    var url = window.location
    var title = document.title
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf("360se") > -1) {
      alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！")
    } else if (ua.indexOf("msie 8") > -1) {
      window.external.AddToFavoritesBar(url, title) //IE8
    } else if (document.all) {
      try{
        window.external.addFavorite(url, title)
      } catch (e) {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!')
      }
    } else if (window.sidebar) {
      window.sidebar.addPanel(title, url, "")
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

  //删除右边的空格
  trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },

  //删除左边的空格
  ltrim: function (str) {
    return str.replace(/(^\s*)/g, '')
　},

  //删除右边的空格
  rtrim: function (str) {
    return str.replace(/(\s*$)/g, '')
  }
}
