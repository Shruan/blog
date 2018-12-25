<template lang="html">
    <nav>
      <ul
        ref="smyTab"
        class="smy-tab"
        :style="'padding-right:' + (rightWidth || 0) + 'px'">
        <li
          v-if="showAll"
          ref="smyTabList"
          class="smy-tab-list"
          @click="realValue = allValue">
          <div class="content-body">
            <p :class="{
              'active': realValue === allValue
            }"
            >
              全部
            </p>
          </div>
        </li>
        <li
          ref="smyTabList"
          class="smy-tab-list"
          v-for="(item, index) in list"
          :key="item.value"
          @click="realValue = item.value">
          <div class="content-body">
            <p :class="{
              'active': realValue === item.value
            }"
            >
              {{item.name}}
            </p>
            <div
              v-if="item.value !== '' && showBadge"
              class="badge"
              >
              <span>{{badgeCountList[item.value] || 0}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="smy-tab-right" v-if="hasRightSlot">
        <slot name="right"/>
      </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: [ String, Number ]
    },
    list: {
      type: Array,
      required: true
    },
    showBadge: {
      type: Boolean,
      default: false
    },
    badgeCountList: {
      type: Object
    },
    isScroller: {
      type: Boolean,
      default: false
    },
    rightWidth: {
      type: Number
    },
    showAll: {
      type: Boolean,
      default: false
    },
    allValue: {
      type: [ String, Number ]
    }
  },
  data () {
    return {
      realValue: this.value || '',
      hasRightSlot: false,
      nowIndex: 0,
      scrollTop: 0,
      badgeCount: {}
    }
  },
  computed: {
    ...mapState('globalStore', [
      'pageReload'
    ])
  },
  watch: {
    value (val) {
      if (this.value !== undefined) {
        this.realValue = val
      }
    },
    realValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    list (val) {
      if (val && val.length > 0) {
        this.getBadgeCount()
      }
    }
  },
  mounted () {
    this.$slots.right && (this.hasRightSlot = true)

    // 滚动至默认激活位置
    if (this.isScroller && this.value !== undefined && this.list.length > 0) {
      this.scrollTop = 0
      this.nowIndex = this.list.map(item => item.value).indexOf(this.value)
      if (this.nowIndex > 0) {
        let liWidth = this.$refs.smyTabList.map(item => item.offsetWidth)
        for (let i = 0; i < this.nowIndex; i++) this.scrollTop += liWidth[i]
        this.$refs.smyTab.scrollTo(this.scrollTop, 0)
      }
    }
    // console.log(this.$refs.smyTabList[2].offsetWidth)
  },
  methods: {},
  created () {
    if (!this.showBadge) {
      if (this.value === undefined && this.list.length > 0) {
        this.realValue = this.list[0].value
      }
    }
  }
}
</script>

<style lang="less" scoped>

  @prefixClass: smy-tab;

  .@{prefixClass} {
    padding: 0 10/12.5rem;
    height: 40/12.5rem;
    line-height: 33/12.5rem;
    box-sizing: border-box;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    background: #fff;
    transition: left 0.3s ease;

    &-list {
      font-size: 14/12.5rem;
      position: relative;
      display: inline-block;
      padding: 0 8/12.5rem;

      .content-body{
        display: flex;
        align-items: center;

        .badge {
          // position: absolute;
          // top: 0;
          // bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10/12.5rem;
          box-sizing: border-box;
          display: inline-block;
          height: 17/12.5rem;
          min-width: 17/12.5rem;
          padding: 0 5/12.5rem;
          border-radius: 30/12.5rem;
          margin: auto 0 auto 4/12.5rem;
          line-height: 17/12.5rem;
          font-size: 11/12.5rem;
          background-clip: padding-box;
          vertical-align: middle;
          background: rgb(140, 223, 181);
          color: rgb(255, 255, 255);
        }
      }
    }

    &-right {
      position: absolute;
      right: 0;
      top: 0;
      width: 18%;
      height: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #fffbfb;
    }
    .active {
      color: #3ccba6;
    }
    .active::after {
      content: ' ';
      height: 2/12.5rem;
      width: 60%;
      left: 20%;
      display: block;
      text-align: center;
      background: #3ccba6;
      position: relative;
      bottom: 0;
      line-height: 1/12.5rem;
      border-radius: 4/12.5rem;
    }
  }

  .@{prefixClass}::-webkit-scrollBar {
    display: none;
  }

</style>
