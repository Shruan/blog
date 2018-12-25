<template lang="html">
  <div
    class="order-item"
    :class="{
      'card': isCard
    }"
    :style="{
      height: miniStyle.height,
      padding: miniStyle.padding
    }"
    >
    <div class="header">
      <div
        class="
          font-size-h3-large
          smy__text-overflow-one-line
          title
        ">
        <div class="temp-icon" v-if="hasTempIcon">
          <slot name="temp-icon"/>
        </div>
        <div class="content smy__text-overflow-one-line">
          <slot name="title"/>
        </div>
        <div
          v-if="priority && priority != 1"
          class="priority font-size-h4-normal"
          :class="{
            'priority-2': priority === 2,
            'priority-3': priority === 3
          }">
          <span class="label">
            {{priorityMapping[priority]}}
          </span>
        </div>
      </div>
      <div
        v-if="(ding && [2, 3, 7].indexOf(ding) !== -1) || inside === 1"
        class="source">
        <div
          v-if="(ding && [2, 3, 7].indexOf(ding) !== -1)"
          class="source-icon">
          <img
            :src="`/spa_static_mobile/icon/${sourceIcon[ding]}.png`"
            width="100%"
            height="100%"
          >
        </div>
        <div
          v-if="inside === 1"
          class="source-icon">
          <img
            src="/spa_static_mobile/icon/icon_inside32_32@3x.png"
            width="100%"
            height="100%"
          >
        </div>
      </div>
    </div>
    <div class="content">
      <div class="right-tip">
        <div
          class="status font-size-h3-normal"
          :style="{ color: statusColorMapping[status] }"
          >
          {{orderStatusMapping[status]}}
        </div>
        <div
          class="timeout font-size-h4-normal"
          >
          <!-- {{'超时1小时' | overdueFilter(new Date().getTime())}} -->
        </div>
      </div>

      <div
        v-if="hasNo"
        class="font-size-h4-large no"
        >
        <slot name="no"/>
      </div>

      <div
        v-if="hasTime"
        class="font-size-h4-large time">
        <slot name="time"/>
        <div
          v-if="time&&[0,1,2,3].indexOf(status)!==-1"
          class="appointment-time">
          {{formatNowTime}}
        </div>
      </div>

      <div
        v-if="hasCustomer"
        class="font-size-h4-large customer">
        <slot name="customer"/>
      </div>

      <div
        v-if="hasAddress"
        class="font-size-h4-large address  smy__text-overflow-one-line">
        <slot name="address"/>
      </div>
    </div>

    <div
      v-if="abnormal === 1"
      class="abnormal">
      <img
        src="../../assets/icon/abnormal.png"
        width="100%"
        height="100%"
      >
    </div>

    <div
      v-if="examine === 1"
      class="under-icon">
      <img
        src="/spa_static_mobile/icon/under_approval237_195@3x.png"
        width="100%"
        height="100%"
      >
    </div>

    <slot />
  </div>
</template>

<script>
import {
  orderStatusMapping,
  priorityMapping,
  statusColorMapping
} from '@/constant'

import utils from '@/utils/utils'

export default {
  props: {
    isCard: {
      type: Boolean,
      default: false
    },
    time: [ String, Number ],
    priority: [ String, Number ],
    ding: [ String, Number ],
    inside: [ String, Number ],
    abnormal: [ String, Number ],
    status: [ String, Number ],
    examine: [ String, Number ]
  },
  data () {
    return {
      priorityMapping,
      orderStatusMapping,
      statusColorMapping,
      sourceIcon: {
        2: 'icon_h532_32@3x',
        3: 'icon_wechat32_32@3x',
        7: 'icon_ding32_32@3x'
      },
      nowTime: new Date().getTime(),
      mini: this.$parent.$parent.mini, // 是否是两行列表
      showImage: this.$parent.$parent.showImage, // 是否显示图片
      // 是否slot
      hasTempIcon: false,
      hasNo: false,
      hasTime: false,
      hasCustomer: false,
      hasAddress: false
    }
  },
  computed: {
    miniStyle () {
      let miniStyle = {}
      if (this.mini) {
        // miniStyle.height = '4.8rem'
        miniStyle.padding = '.8rem 1rem'
        miniStyle.imgHeightWidth = '3.2rem'
        miniStyle.imgBorderRadius = '50%'
      } else {
        // miniStyle.height = '10.8rem'
        // miniStyle.height = '12.26rem'
        miniStyle.padding = '1rem 1rem'
        miniStyle.imgHeightWidth = '4.8rem'
        miniStyle.imgBorderRadius = '.24rem'
      }
      return miniStyle
    },
    formatNowTime () {
      let timeStamp = new Date(utils.formatDate(this.time)).getTime()
      return this.formatTime((timeStamp - this.nowTime) / 1000)
    }
  },
  methods: {
    // 格式化逾期工单具体时间
    formatTime (second) {
      second = parseInt(second)
      let text = ''
      if (second < 0) {
        text += '逾期'
      } else {
        text += '距离服务时间'
      }
      second = parseInt(Math.abs(second))
      var day = parseInt(second / (60 * 60 * 24))
      var hour = parseInt((second % (60 * 60 * 24)) / (60 * 60))
      var minute = parseInt((second % (60 * 60)) / 60)
      if (day > 0) {
        text += day + '天'
        return text
      }
      if (hour > 0) {
        text += hour + '小时' + minute + '分钟'
        return text
      }
      if (minute > 0) {
        text += minute + '分钟'
        return text
      }
      return '已到预约时间'
    },
    updateTime () {
      setTimeout(() => {
        this.nowTime += 10
        this.updateTime()
      }, 10000)
    }
  },
  mounted () {
    this.$slots['temp-icon'] && (this.hasTempIcon = true)
    this.$slots['no'] && (this.hasNo = true)
    this.$slots['time'] && (this.hasTime = true)
    this.$slots['customer'] && (this.hasCustomer = true)
    this.$slots['address'] && (this.hasAddress = true)
    // if (this.time) {
    //   this.updateTime()
    // }
  }
}
</script>

<style lang="less" scoped>
.card {
  margin: 0.36rem 0.4rem;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.24rem 0.24rem rgba(229, 229, 229, 0.56);
}

.order-item {
  position: relative;
  background: #fff;
  box-sizing: border-box;
  margin-bottom: 0.44rem;
  overflow: hidden;

  .header {
    border-bottom: 1px solid #F2F2F2;
    color: #1a1e24;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;

    > .title {
      display: flex;
      align-items: center;

      .temp-icon {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        overflow: hidden;
        margin-right: 0.8rem;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
        color: #1A1E24;
      }

      > .priority {
        display: inline-block;
        border-radius: 0.32rem;
        border: 1px solid;
        padding: .2rem .4rem;
        margin-left: 0.4rem;
        flex-shrink: 0;

        > .label {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      > .priority-2 {
        background: rgba(255, 184, 77, .1);
        border-color: #ffb84d;
        color: #ffb84d;
      }

      > .priority-3 {
        background: rgba(242, 121, 91, .1);
        border-color: #f2795b;
        color: #f2795b;
      }
    }

    > .source {
      display: flex;
      align-items: center;

      > .source-icon {
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        overflow: hidden;
        margin-left: 0.4rem;
      }
    }
  }

  .content {
    position: relative;
    color: #7f8184;

    .right-tip {
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;

      .timeout {
        margin-top: 0.4rem;
        color: #f2795b;
      }
    }


    .no, .customer, .address, .time {
      margin-top: .6rem;
      color: #1A1E24;
    }

    .time {
      display: flex;

      .appointment-time {
        margin-left: 0.6rem;
        color: #a28080;
      }
    }
  }

  > .abnormal {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.2rem;
    height: 1.2rem;
  }

  > .under-icon {
    position: absolute;
    width: 9.48rem;
    height: 7.8rem;
    right: 1.6rem;
    top: 1.52rem;
  }
}

</style>
