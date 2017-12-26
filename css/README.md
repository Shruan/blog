# CSS
### css-icon

##### 关闭图标
``` css
  .close {
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;
  }
  .close:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 6px;
    width: 12px;
    border-top: 1px solid #ddd;
    transform: rotate(45deg);
  }
  .close:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 6px;
    width: 12px;
    border-top: 1px solid #ddd;
    transform: rotate(-45deg);
  }
```

##### 箭头图标
``` css
/* 右箭头 */
  .rightArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    transform: rotate(45deg);
  }
```
``` css
/* 左箭头 */
  .leftArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    transform: rotate(45deg);
  }
```
``` css
/* 下箭头 */
  .bottomArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    transform: rotate(45deg);
  }
```
``` css
/* 上箭头 */
  .topArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    transform: rotate(45deg);
  }
```
##### 三角形
``` css
/* 下三角 */
  .bottomTriangle {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    overflow: hidden;
  }
  .bottomTriangle:after {
    content: '';
    position: absolute;
    top: 2px;
    display: inline-block;
    border-top: 4px solid #ddd;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
  }
```

``` css
/* 上三角 */
  .topTriangle {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    overflow: hidden;
  }
  .topTriangle:after {
    content: '';
    position: absolute;
    bottom: 2px;
    display: inline-block;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #ddd;
    border-left: 4px solid transparent;
  }
```

``` css
/* 右三角 */
  .rightTriangle {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    overflow: hidden;
  }
  .rightTriangle:after {
    content: '';
    position: absolute;
    left: 2px;
    display: inline-block;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid #ddd;
  }
```

``` css
/* 左三角 */
  .leftTriangle {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    overflow: hidden;
  }
  .leftTriangle:after {
    content: '';
    position: absolute;
    right: 2px;
    display: inline-block;
    border-top: 4px solid transparent;
    border-right: 4px solid #ddd;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
  }
```
