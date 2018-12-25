### 基于vux二次封装的组件

------------------------------------------------------------------------------------------------------

- DatetimeRange 范围日期选择组件
属性             说明                类型          默认值
title            标题               String
value            默认值['', '']      Array         
format           日期格式            String        默认：'YYYY-MM-DD HH:mm'， 可支持（'YYYY-MM-DD'）格式
middle           中间文案            String        至
placeholder      筛选提示文案         Array         ['请选择时间', '请选择时间']
is-show-quick    快捷操作            Boolean       false
quick-list       快捷操作列表         Array         ['today', 'yesterday', 'thisWeek', 'thisMonth']

回调            说明            返回值             备注
on-change     选择日期回调     ['2018-7-25 17:26', '2018-7-25 17:26']

```javascript
  // 快捷操作可选值（ quick-list ）
  { name: '今天', value: 'today' },
  { name: '昨天', value: 'yesterday' },
  { name: '明天', value: 'tomorrow' },
  { name: '未来三天', value: 'afterThreeDay' },
  { name: '未来七天', value: 'afterSevenDay' },
  { name: '过去三天', value: 'beforeThreeDay' },
  { name: '过去七天', value: 'beforeSevenDay' },
  { name: '本周', value: 'thisWeek' },
  { name: '上一周', value: 'lastWeek' },
  { name: '下一周', value: 'nextWeek' },
  { name: '本月', value: 'thisMonth' },
  { name: '上一个月', value: 'lastMonth' },
  { name: '下一个月', value: 'nextMonth' }
```

```html
  <!-- 使用方式 -->
  <SmyDatetimeRange
    title="日期选择"
    is-show-quick
    :quick-list="['today', 'yesterday', 'beforeThreeDay', 'beforeSevenDay']"
    :placeholder="['请选择开始时间', '请选择结束时间']"
    :value="[searchForm.finishStart, searchForm.finishEnd]"
    @on-change="[searchForm.finishStart, searchForm.finishEnd] = $event"
  />
```
------------------------------------------------------------------------------------------------------
