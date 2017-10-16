/*
* 使用方法
* import { myDOM } from '@/coMethods/utils.js'
* myDom.addClass(el, className)
*/

 export const myDOM = {
   // 判断是否有该 class
   hasClass (el, className) {
     let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
     return reg.test(el.className)
   },

   // 添加 class
   addClass (el, className) {
     if (this.hasClass(el, className)) {
       return
     }
     let newClass = el.className.split(' ')
     newClass.push(className)
     el.className = newClass.join(' ')
   },

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
   }

 }
