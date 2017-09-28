# CSS
### css-icon
##### 关闭图标
<pre><code>
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
</pre></code>
##### 箭头图标
>右箭头
<pre><code>
  .rightArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    transform: rotate(45deg);
  }
</pre></code>
>左箭头
<pre><code>
  .leftArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    transform: rotate(45deg);
  }
</pre></code>
>下箭头
<pre><code>
  .bottomArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    transform: rotate(45deg);
  }
</pre></code>
>上箭头
<pre><code>
  .topArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    transform: rotate(45deg);
  }
</pre></code>
##### 三角形
>下三角
<pre><code>
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
</pre></code>
>上三角
<pre><code>
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
</pre></code>
>右三角
<pre><code>
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
</pre></code>
>左三角
<pre><code>
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
</pre></code>
