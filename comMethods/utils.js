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

 }
