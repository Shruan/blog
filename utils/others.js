/*
* 使用方法
* import { shy_other } from '@/coMethods/utils.js'
* myDom.addClass(el, className)
*/

export const shy_other = {
 // 加入收藏夹方法
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
  }
}
