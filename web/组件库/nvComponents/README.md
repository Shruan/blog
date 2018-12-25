### 原生组件库


------------------------------------------------------------------------------------------------------

- YnTab 定制Tab组件
属性             说明                类型          默认值
value            v-model           String         
list             列表数据            Array        [{name: '11', value: 11}]
showAll          显示左侧全部        Boolean        
allValue         全部按钮的value值   String       
rightWidth       右侧留白宽度        Number
isScroller       滚动至激活列表      Boolean

回调            说明            返回值             备注
on-change     点击事件回调       列表的value值


```html
  <!-- 使用方式 -->
  <YnTab
    show-all
    show-badge
    is-scroller
    :all-value="''"
    :list="orderStatusListFilter"
    :right-width="68"
    v-model="searchForm.state"
    @on-change="loadList(true, 'search')"
  >
    <div
      slot="right"
      class="right-btn"
      @click="showSearchDetail = !showSearchDetail">
    </div>
  </YnTab>
```
---------------------------------------------------


---------------------------------------------------

- YnUserLogo 用户头像展示
属性            说明            类型              默认值
size           显示大小        Number            1 = 180px, 2 = 80px, 3 = 44px
name           用户名          String             
url            用户头像url     String           
show-border    显示边框        Boolean           false
border-width   边框宽度        Number            1
border-color   边框颜色        String            #fff

回调            说明            返回值               备注
无

```html
  <!-- 使用方式 -->
  <YnUserLogo
    show-border
    :size="4"
    :border-width="3"
    :name="item.name"
    :url="item.avatar"
  />
```
---------------------------------------------------
