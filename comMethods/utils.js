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

  addFavorite: function () {
     var url = window.location;
     var title = document.title;
     var ua = navigator.userAgent.toLowerCase();
     if (ua.indexOf("360se") > -1) {
       alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
     } else if (ua.indexOf("msie 8") > -1) {
       window.external.AddToFavoritesBar(url, title); //IE8
     } else if (document.all) {
       try{
         window.external.addFavorite(url, title);
       } catch (e) {
         alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
       }
     } else if (window.sidebar) {
       window.sidebar.addPanel(title, url, "");
     } else {
       alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
     }
   }
 }
