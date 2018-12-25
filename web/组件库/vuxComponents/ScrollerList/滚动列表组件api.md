- ScrollerList 滚动列表

属性            说明            类型         默认值
height          高度            Number      必填（rem单位，无SearchBar高度为53rem, 有SearchBar高度为49rem）
isPx            height是否是px  Boolean     false
size            列表大小        String      normal(mini:两行样式，不显示extra插槽；large:四行样式)
show-image      是否显示图片     Boolean     false
circle-image    图片是否为圆形   Boolean     false
check           是否开启多选     Boolean     false（仅ScrollerItem有效）
max-check       可选数量上限     Number      -1(-1表示不限制数量)

回调                   说明                 返回值         备注
on-pulldown-loading    下拉刷新回调
on-pullup-loading      上拉加载回调
on-check-change        勾选内容修改回调      ['xx', 'xx']  ScrollerItem绑定的value数组
on-check-ok            开启多选后确认回调    ['xx', 'xx']  ScrollerItem绑定的value数组

插槽          说明
默认          scroller内容，一般使用scrollerItem元素

方法            说明
donePulldown    下拉刷新完成
donePullup      上拉加载完成
disablePullup   禁用上拉，返回的list长度小于pageSize时调用
enablePullup    启用上拉


---------------------------------------------------

- ScrollerItem 滚动列表元素，与ScrollerList搭配使用

属性            说明            类型         默认值
img-url         图片url         String      ''
text            无url时显示内容  String      ''
value           开启多选时的值   String      ''

插槽            说明
title           标题
extra           副标题（ScrollerList的size为mini时无效）
content         内容
