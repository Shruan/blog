/*
* 使用方法
* import { shy_HttpFormat } from '@/coMethods/utils.js'
* myDom.addClass(el, className)
*/

export const shy_HttpFormat = {
  // 拾取url后面带的参数 如a.html?key=aaaa&name=1232
  // 调用方式 var Request=new urlCatch(); //实例化
  // alert(Request.wd);
  urlCatch: function () {
    var name , value;
    var obj = {}
    var str = location.href; // 取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); // 取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); // 各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        obj[name] = value;
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

}
