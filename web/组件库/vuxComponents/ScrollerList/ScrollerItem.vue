<template lang="html">
  <div
    class="scroller-item"
    :style="{
      height: miniStyle.height,
      padding: miniStyle.padding
    }"
    >
    <div
      class="check"
      v-if="check"
      >
      <CheckIcon :value.sync="isCheck"/>
    </div>
    <!-- 图片 或 头像 -->
    <div
      class="img"
      v-if="showImage"
      :style="{
        width: miniStyle.imgHeightWidth,
        height: miniStyle.imgHeightWidth
      }"
      >

      <div   v-if="name && circleImage">
      <YnUserLogo
        :size="2"
        :url="imgUrl"
        :name="name"
        />
        <div v-if="statecolor" >
         <Popup
            :statuscolor="statecolor"
            :Types="4"
          />
          </div>
          </div>
      <img class="img-i" :src="imgUrl" alt="" v-else>
    </div>
    <div class="text">
      <div
        class="font-size-h3-large smy__text-overflow-one-line"
        >
        <slot name="title"/>
      </div>
      <div
        class="font-size-h4-large smy__text-overflow-one-line extra"
        :class="{'extra-log':logflag}"
        v-if="size != 'mini'"
        >
        <slot name="extra"/>
      </div>
      <div
        class="font-size-h4-large content"
        :style="{
          marginTop: miniStyle.contentMarginTop
        }"
        >
        <slot name="content"/>
      </div>
    </div>
    <div class="end">
      <slot name="end"/>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vux'
import YnUserLogo from '@/components/YnUserLogo'
import Popup from '@/pages/mine/popup'
export default {
  components: {
    CheckIcon,
    YnUserLogo,
    Popup
  },
  props: {
    imgUrl: String,
    statecolor: [String, Object],
    name: String,
    value: {
      type: [String, Number],
      default: ''
    },
    showflag: Boolean,
    logflag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCheck: false
    }
  },
  computed: {
    // 是否是两行列表
    size () {
      return this.$parent.$parent.size
    },
    // 是否显示图片
    showImage () {
      return this.$parent.$parent.showImage
    },

    // 图片是否为圆形
    circleImage () {
      return this.$parent.$parent.circleImage
    },
    // 是否开启多选
    check () {
      return this.$parent.$parent.check
    },
    miniStyle () {
      let miniStyle = {}
      if (this.size === 'mini') {
        miniStyle.height = '4.8rem'
        miniStyle.padding = '.8rem 1rem'
        miniStyle.imgHeightWidth = '3.2rem'
        // miniStyle.contentMarginTop = '.24rem'
      } else if (this.size === 'normal') {
        miniStyle.height = '7.2rem'
        miniStyle.padding = '1.2rem 1rem'
        miniStyle.imgHeightWidth = '4.8rem'
        miniStyle.contentMarginTop = '.36rem'
      } else if (this.size === 'large') {
        miniStyle.height = '8.72rem'
        miniStyle.padding = '1.2rem 1rem'
        miniStyle.imgHeightWidth = '6.2rem'
        miniStyle.contentMarginTop = '.36rem'
      }
      if (this.circleImage) {
        miniStyle.imgBorderRadius = '50%'
      } else {
        miniStyle.imgBorderRadius = '.24rem'
      }
      return miniStyle
    },
    // 选中列表
    checkList: {
      get () {
        return this.$parent.$parent.checkList
      },
      set (newVal) {
        this.$parent.$parent.checkList = newVal
      }
    }
  },
  watch: {
    // 将选中状态同步至checkList
    isCheck (val) {
      let index = this.checkList.indexOf(this.value)
      if (val) {
        if (index === -1) {
          this.checkList.push(this.value)
        }
      } else {
        if (index !== -1) {
          this.checkList.splice(index, 1)
        }
      }
    },
    checkList (val) {
      if (val.indexOf(this.value) !== -1) {
        this.isCheck = true
      } else {
        this.isCheck = false
      }
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.scroller-item:first-child {
  border-top: 1px solid #F2F2F2;
}
.scroller-item {
  display: flex;
  border-bottom: 1px solid #F2F2F2;
  box-sizing: border-box;
  text-align: left;
  background: #FFF;

  .check {
    display: flex;
    align-items: center;
    margin-right: .8rem;
  }

  .img {
    flex-shrink: 0;
    overflow: hidden;
    margin-right: 1.2rem;

    .img-i {
      width: 100%;
      height: 100%
    }
  }

  .text {
    flex: 1;
    width: 1px;
  }

  .title {
    color: #1a1e24;
  }

  .extra {
    color: #a3a5a7;
    margin-top: .32rem;
  }

  .extra-log {
    color: #1a1e24;
    margin-top: .32rem;
    font-size: 0.88rem;
  }
  .content {
    color: #7f8184;
  }

  .end {
    display: flex;
    align-items: center;
  }
}
</style>
