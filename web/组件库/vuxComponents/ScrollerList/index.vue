<template lang="html">
  <div class="smy__scroller-container">
    <!-- 全选区域 -->
    <div
      class="check-all"
      v-if="check && (total && total !== 0)"
      @click="isCheckAllChange"
      >
      <CheckIcon :value="isCheckAll"></CheckIcon>
      <div class="check-all-text">
        全选
      </div>
    </div>
    <!-- 滚动区域 -->
    <scroller
      lock-x
      ref="scrollerBottom"
      class="scroller-content"
      :class="{'smy__scroller-loading': pulldownLoading}"
      :height="`${heightToPx}px`"
      :scroll-bottom-offset="120"
      :use-pulldown="usePulldown"
      :use-pullup="true"
      :pullup-config="pullupDefaultConfig"
      :pulldown-config="pulldownDefaultConfig"
      @on-pulldown-loading="onPulldown"
      @on-pullup-loading="onPullup">

      <div class="box2" ref="scrollerListBox">
        <slot/>
        <div class="null-box"></div>
        <div
          class="no-more"
          v-show="noMoreShow && !noResult"
          >
          没有更多结果
        </div>
        <div class="null-box"></div>
      </div>
      <div
        slot="pullup"
        v-show="!noMoreShow && pullupLoading"
        class="smy__plugin-pullup-container smy__plugin-pullup-down">
        <load-more tip="加载中..."></load-more>
      </div>
    </scroller>
    <!-- 无数据图片 -->
    <div
      :style="`height: ${heightToPx}px`"
      class="no-result-body"
      v-show="noResult"
      >
      <div class="no-result">
        <img class="img" src="/spa_static_mobile/icon/none.png">
      </div>
    </div>
    <div style="height: 4rem;" v-if="check"></div>
    <!-- 底部展示选中，未开启多选或选择上限为1时不显示 -->
    <div
      class="checked-list bottom-bar"
      v-if="check"
      >
      <div class="checked-list-img">
        <div
          class="checked-list-img-item"
          v-for="(item, index) in checkListImg"
          >
          <img
            v-if="item.imgUrl || !item.name"
            :src="item.imgUrl"
            class="checked-list-img-item-i"
            >
          <YnUserLogo
            v-else
            :size="5"
            :url="item.imgUrl"
            :name="item.name"
          />
        </div>
      </div>
      <div
        class="checked-list-button"
        >
        <XButton
          type="primary"
          @click.native="$emit('on-check-ok', checkList.slice().sort((a, b) => a - b))"
          >
          确定({{checkList.length}}/{{slotsDefaultLength}})
        </XButton>
      </div>
    </div>
  </div>
</template>

<script>
import { Scroller, LoadMore, CheckIcon, XButton } from 'vux'

import YnUserLogo from '@/components/YnUserLogo'

export default {
  components: {
    Scroller,
    LoadMore,
    CheckIcon,
    XButton,
    YnUserLogo,
  },
  props: {
    height: {
      type: Number,
      required: true
    },
    // 是否是两行列表
    size: {
      type: String,
      default: 'normal'
    },
    // 是否显示图片
    showImage: {
      type: Boolean,
      default: false
    },
    circleImage: {
      type: Boolean,
      default: false
    },
    isPx: {
      type: Boolean,
      default: false
    },
    // 是否开启多选框
    check: {
      type: Boolean,
      default: false
    },
    // 多选数量上限 默认为-1不限制
    maxCheck: {
      type: Number,
      default: -1
    },
    total: {
      type: Number
    },
    usePulldown: {
      type: Boolean,
      default: true
    },
    ids: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 上拉加载配置
      pullupDefaultConfig: {
        content: '上拉加载更多',
        pullUpHeight: 150,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
        clsPrefix: 'smy__plugin-pullup-'
      },
      // 下拉刷新配置
      pulldownDefaultConfig: {
        downContent: '下拉刷新',
        upContent: '释放后刷新',
        loadingContent: '正在刷新...',
        clsPrefix: 'smy__plugin-pulldown-'
      },
      noMoreShow: false, // 没有更多结果 显示
      noResult: false, // 没有数据 显示
      checkList: [], // 选中的列表
      checkListImg: [], // 选中的列表图片信息
      slotsDefaultLength: 0, // item数量
      pulldownLoading: false,
      pullupLoading: false
    }
  },
  computed: {
    // rem高度参数转为px
    heightToPx () {
      let fontSize = window.getComputedStyle(window.document.documentElement)['font-size']
      fontSize = Number(fontSize.substr(0, fontSize.length - 2))
      let height = this.height
      if (!this.isPx) height = fontSize * height
      // 如果开启了多选 需要减去上下距离
      if (this.check) {
        let top = 4.32 * fontSize
        let bottom = 4 * fontSize
        height = height - top - bottom
      }
      return height
    },
    isCheckAll () {
      return this.slotsDefaultLength === this.checkList.length
    }
  },
  watch: {
    // 无结果显示
    total (val) {
      if (val || val === 0) {
        if (val === 0) {
          if (!this.noResult) this.noResult = true
        }
        if (val > 0) {
          if (this.noResult) this.noResult = false
        }
      }
    },
    checkList (val, oldVal) {
      if (this.check) {
        this.$nextTick(() => {
          if (this.maxCheck > 0 && this.checkList.length > this.maxCheck) {
            this.$vux.toast.text(`最多可选${this.maxCheck}个`)
            this.checkList = oldVal.splice(0, this.maxCheck)
          }
          if (this.$slots.default) {
            let slotCheckList = this.$slots.default.filter(item => val.indexOf(item.componentInstance.value) !== -1)
            let checkListImg = slotCheckList.map(item => {
              return {
                imgUrl: item.componentInstance.imgUrl,
                name: item.componentInstance.name
              }
            })
            this.checkListImg = checkListImg
          } else {
            this.checkListImg = []
          }
          this.$emit('on-check-change', this.checkList.slice().sort((a, b) => a - b))
        })
      }
    },
    ids: {
      handler (val) {
        this.checkList = val.slice()
      },
      immediate: true
    }
  },
  methods: {
    // 全选 开关
    isCheckAllChange () {
      if (this.isCheckAll) {
        this.checkList = []
      } else {
        for (let item of this.$slots.default) {
          item.componentInstance.isCheck = true
        }
      }
    },
    // 下拉刷新
    onPulldown () {
      this.pulldownLoading = true
      this.$emit('on-pulldown-loading')
      this.$refs.scrollerBottom && this.$refs.scrollerBottom.disablePullup()
    },
    // 下拉刷新完成
    donePulldown () {
      setTimeout(() => {
        this.pulldownLoading = false
      }, 1000)
      this.$refs.scrollerBottom && this.$refs.scrollerBottom.donePulldown()
      if (this.check) {
        // 刷新后清空选中
        this.checkList = []
        // 获取item数量
        this.$nextTick(() => {
          this.slotsDefaultLength = this.$slots.default ? this.$slots.default.length : 0
        })
      }
      this.$refs.scrollerBottom && this.$refs.scrollerBottom.enablePullup()
    },
    // 上拉加载
    onPullup () {
      this.pullupLoading = true
      this.$emit('on-pullup-loading')
    },
    // 上拉加载完成
    donePullup () {
      // this.$refs.scrollerBottom.donePullup()
      setTimeout(() => {
        this.pullupLoading = false
      }, 1000)
      if (this.check) {
        // 获取item数量
        this.$nextTick(() => {
          this.slotsDefaultLength = this.$slots.default ? this.$slots.default.length : 0
        })
      }
    },
    // 开启上拉加载
    enablePullup () {
      this.$refs.scrollerBottom && this.$refs.scrollerBottom.enablePullup()
      this.noMoreShow = false
    },
    // 禁用上拉加载
    disablePullup () {
      this.$refs.scrollerBottom && this.$refs.scrollerBottom.disablePullup()
      this.noMoreShow = true
    },
    // 初始化状态
    initLoading () {
      this.noResult = false
      this.noMoreShow = false
    },
    // 滚动到顶部
    scrollToTop () {
      this.$refs.scrollerBottom && this.$refs.scrollerBottom.reset({ top: 0 })
    }
  },
  created () {
    if (this.total || this.total === 0) {
      if (this.total === 0) {
        if (!this.noResult) this.noResult = true
      }
      if (this.total > 0) {
        if (this.noResult) this.noResult = false
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scrollerBottom && this.$refs.scrollerBottom.reset()
      if (this.check) {
        this.slotsDefaultLength = this.$slots.default ? this.$slots.default.length : 0
      }
    })
  }
}
</script>

<style lang="less" scoped>
.smy__scroller-container {
  position: relative;

  .scroller-content {
    position: relative;
  }
  .check-all {
    display: flex;
    align-items: center;
    height: 3.6rem;
    background: #fff;
    margin-bottom: .72rem;
    padding: 0 1rem;

    .check-all-text {
      margin-left: .8rem;
    }
  }
  .box2 {
    height: 100%;
  }
  .no-more {
    text-align: center;
    color: #a3a5a7;
    font-size: .88rem;
    // padding-top:
  }

  .no-more::before {
    content: '';
    height: 1/12.5rem;
    width: 4.8rem;
    background: #d7d7d7;
    display: inline-block;
    vertical-align: middle;
    margin-right: 1.2rem;
  }

  .no-more::after {
    content: '';
    height: 1/12.5rem;
    width: 4.8rem;
    background: #d7d7d7;
    display: inline-block;
    vertical-align: middle;
    margin-left: 1.2rem;
  }

  .no-result-body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;

    > .no-result {
      width: 22rem;

      > .img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .null-box {
    height: 1rem;
  }

  .checked-list {
    display: flex;
    justify-content: space-between;
    height: 4rem;
    overflow: hidden;
    background: #fff;
    z-index: 999;

    .checked-list-img {
      display: flex;
      align-items: center;
      width: 20.8rem;
      overflow-x: auto;

      .checked-list-img-item {
        flex-shrink: 0;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 1rem;

        .checked-list-img-item-i {
          width: 100%;
          height: 100%;
        }
      }
    }

    .checked-list-img::-webkit-scrollbar {
      display: none;
    }

    .checked-list-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 9.2rem;
      box-shadow: -.08rem 0 .16rem rgba(204, 204, 204, .35);
      padding: 0 .6rem;
      box-sizing: border-box;
      font-size: 13/12.5rem;
    }
  }

}

</style>
<style lang="less">

.smy__plugin-pulldown-container, .smy__plugin-pullup-container {
  color: #a3a5a7;
}

.smy__plugin-pullup-container {
  position: absolute;
  bottom: -2rem;
  width: 100%;
}
.smy__plugin-pulldown-container::before {
  display: inline-block;
  content: ' ';
  width: 1.28rem;
  height: 1.28rem;
  vertical-align: sub;
  background-image: url('/spa_static_mobile/icon/loading32_32.png');
  background-position: center;
  background-size: cover;
  margin-right: 10px;
}

.smy__scroller-loading {
  .smy__plugin-pulldown-container::before {
    animation: scrollerRotate 1s linear infinite;
  }
}

@keyframes scrollerRotate
{
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
