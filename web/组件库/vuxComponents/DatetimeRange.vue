<template lang="html">
  <div
    class="smy__datetime-range"
    :class="{ border: showBorder }">
    <div
      v-if="title"
      class="title"
      :class="{ 'title-border': showBorder }">
      <label class="weui-label">{{title}}</label>
    </div>
    <div class="datetime-range-body">
      <div class="datetime-body">
        <datetime
          v-model="startDate"
          :format="format"
          @on-change="onChange">
          <div class="click-area">
            <label
              v-if="startDate"
              class="value">
              {{startDate}}
            </label>
            <label
              v-else
              class="placeholder"
              >
              {{placeholder[0]}}
            </label>
          </div>
        </datetime>
      </div>
      {{middle}}
      <div class="datetime-body">
        <datetime
          v-model="endDate"
          :format="format"
          @on-change="onChange($event, 'end')">
          <div class="click-area">
            <label
              v-if="endDate"
              class="value">
              {{endDate}}
            </label>
            <label
              v-else
              class="placeholder"
              >
              {{placeholder[1] ? placeholder[1] : placeholder[0]}}
            </label>
          </div>
        </datetime>
      </div>
    </div>
    <div
      v-if="isShowQuick"
      class="tag-select">
      <checker
        v-model="radio"
        default-item-class="default-item"
        selected-item-class="selected-item"
        >
        <checker-item
          v-for="item in quickOperationList"
          :key="item.value"
          :value="item.value"
          @on-item-click="selectTag(item.value, item)">
          {{item.name}}
        </checker-item>
      </checker>
    </div>
  </div>
</template>

<script>
import { Datetime, Checker, CheckerItem } from 'vux'

const oneDay = 24 * 60 * 60 * 1000

export default {
  components: {
    Datetime,
    Checker,
    CheckerItem
  },
  props: {
    value: {
      type: [ Array ]
    },
    title: {
      type: [ String ]
    },
    format: {
      type: [ String ],
      default: 'YYYY-MM-DD HH:mm'
    },
    middle: {
      type: [ String ],
      default: '至'
    },
    placeholder: {
      type: Array,
      default: () => {
        return ['请选择时间', '请选择时间']
      }
    },
    isShowQuick: {
      type: Boolean,
      default: false
    },
    quickList: {
      type: Array,
      default: () => {
        return ['today', 'yesterday', 'thisWeek', 'thisMonth']
        // return [
        //   'today',
        //   'yesterday',
        //   'tomorrow',
        //   'afterThreeDay',
        //   'afterSevenDay',
        //   'beforeThreeDay',
        //   'beforeSevenDay',
        //   'thisWeek',
        //   'lastWeek',
        //   'nextWeek',
        //   'thisMonth',
        //   'lastMonth',
        //   'nextMonth'
        // ]
      }
    },
    defaultSelect: {
      type: [ String, Number ]
    },
    showBorder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      startDate: '',
      endDate: '',
      isSelectTag: false,
      allQuickList: [
        { name: '今天', value: 'today' },
        { name: '昨天', value: 'yesterday' },
        { name: '明天', value: 'tomorrow' },
        { name: '未来三天', value: 'afterThreeDay' },
        { name: '未来七天', value: 'afterSevenDay' },
        { name: '近三天', value: 'beforeThreeDay' },
        { name: '近七天', value: 'beforeSevenDay' },
        { name: '近30天', value: 'beforeThirtyDay' },
        { name: '本周', value: 'thisWeek' },
        { name: '上一周', value: 'lastWeek' },
        { name: '下一周', value: 'nextWeek' },
        { name: '本月', value: 'thisMonth' },
        { name: '上一个月', value: 'lastMonth' },
        { name: '下一个月', value: 'nextMonth' }
      ],
      radio: '', // tag选中值
      tagSync: false
    }
  },
  watch: {
    value (val) {
      if (!this.defaultSelect) {
        this.synchrodata()
      }
    },
    defaultSelect (val) {
      if (val) {
        this.tagSync = true
        this.radio = this.defaultSelect
        this.selectTag(this.defaultSelect, ...this.allQuickList.filter(item => item.value === this.radio))
      }
    },
    dateRange (val) {
      if (this.radio && !this.isSelectTag) {
        this.$emit('on-select', {}, [this.startDate, this.endDate])
        this.radio = ''
      }
      this.$emit('on-change', this.dateRange)
      // 操作结束关闭tag切换状态
      setTimeout(() => {
        this.isSelectTag = false
      }, 100)
    }
  },
  computed: {
    quickOperationList () {
      let quickList = []
      this.quickList.forEach(item => {
        quickList = [...quickList, ...this.allQuickList.filter(item2 => item2.value === item)]
      })
      return quickList
    },
    dateRange () {
      // console.log(this.startDate, this.endDate)
      return [this.startDate, this.endDate]
    }
  },
  methods: {
    // 同步数据
    synchrodata () {
      if (this.value) {
        if (this.value.length !== 2) {
          console.warn('The length of the value must be two')
          return false
        }
        if (this.value.length === 2) {
          this.startDate = this.value[0] ? new Date(this.formatDate(this.value[0])).Format(this.format) : ''
          this.endDate = this.value[1] ? new Date(this.formatDate(this.value[1])).Format(this.format) : ''
        }
      }
    },
    getTagDate (name) {
      if (name === 'today') {
        // 今天
        [ this.startDate, this.endDate ] = this.getDayStartAndEnd()
      } else if (name === 'tomorrow') {
        // 明天
        [ this.startDate, this.endDate ] = this.getDayStartAndEnd(1)
      } else if (name === 'yesterday') {
        // 昨天
        [ this.startDate, this.endDate ] = this.getDayStartAndEnd(-1)
      } else if (name === 'afterThreeDay') {
        // 未来三天
        [ this.startDate, this.endDate ] = this.getIntervalDayStartAndEnd(3)
      } else if (name === 'afterSevenDay') {
        // 未来七天
        [ this.startDate, this.endDate ] = this.getIntervalDayStartAndEnd(7)
      } else if (name === 'beforeThreeDay') {
        // 过去三天
        [ this.startDate, this.endDate ] = this.getIntervalDayStartAndEnd(-3)
      } else if (name === 'beforeSevenDay') {
        // 过去七天
        [ this.startDate, this.endDate ] = this.getIntervalDayStartAndEnd(-7)
      } else if (name === 'beforeThirtyDay') {
        // 过去30天
        [ this.startDate, this.endDate ] = this.getIntervalDayStartAndEnd(-30)
      } else if (name === 'thisWeek') {
        // 本周
        [ this.startDate, this.endDate ] = this.getWeekStartAndEnd()
      } else if (name === 'nextWeek') {
        // 下一周
        [ this.startDate, this.endDate ] = this.getWeekStartAndEnd(1)
      } else if (name === 'lastWeek') {
        // 上一周
        [ this.startDate, this.endDate ] = this.getWeekStartAndEnd(-1)
      } else if (name === 'thisMonth') {
        // 本月
        [ this.startDate, this.endDate ] = this.getMonthStartAndEnd()
      } else if (name === 'nextMonth') {
        // 下一个月
        [ this.startDate, this.endDate ] = this.getMonthStartAndEnd(1)
      } else if (name === 'lastMonth') {
        // 上一个月
        [ this.startDate, this.endDate ] = this.getMonthStartAndEnd(-1)
      }
    },
    selectTag (name, data) {
      if (!this.defaultSelect) {
        // 未选中状态点击
        if (!this.radio || this.radio !== name) {
          this.isSelectTag = true // tag选中状态
          this.getTagDate(name)
          this.$emit('on-select', data, [this.startDate, this.endDate])
        } else {
          this.$emit('on-select', {}, [this.startDate, this.endDate])
          // 选中状态点击 清空
          this.startDate = ''
          this.endDate = ''
        }
      } else {
        // 初始化tag选中同步
        if (this.tagSync) {
          this.isSelectTag = true // tag选中状态
          this.getTagDate(name)
          this.$emit('on-select', data)
          this.tagSync = false
        } else {
          if (!this.radio || this.radio !== name) {
            this.isSelectTag = true // tag选中状态
            this.getTagDate(name)
            this.$emit('on-select', data)
          } else {
            this.$emit('on-select', {})
            // 选中状态点击 清空
            this.startDate = ''
            this.endDate = ''
            console.log(this.startDate, this.endDate)
          }
        }
      }
    },
    // 获取当前时刻起间隔count天日期 count：3未来三天、-3过去三天
    getIntervalDayStartAndEnd (count = 0) {
      let startStop = []
      let nowDate = new Date()
      let start = nowDate.Format(this.format)
      let end = new Date(nowDate.setTime(nowDate.getTime() + oneDay * count)).Format(this.format)
      startStop.push(start)
      startStop.push(end)
      return count >= 0 ? startStop : startStop.reverse()
    },

    // 获取今天日期 monthCount：0今天、-1昨天、1明天
    getDayStartAndEnd (dayCount = 0) {
      let startStop = []
      let start = new Date(new Date().setHours(0, 0, 0) + oneDay * dayCount).Format(this.format)
      let end = new Date(new Date().setHours(23, 59, 59) + oneDay * dayCount).Format(this.format)
      startStop.push(start)
      startStop.push(end)
      return startStop
    },

    // 获取本月日期 monthCount：0当前月、-1上一个月、1下一个月
    getMonthStartAndEnd (monthCount = 0) {
      let startStop = []
      let currentDate = new Date()
      let month = currentDate.getMonth() + monthCount
      if (month < 0) {
        let n = parseInt((-month) / 12)
        month += n * 12
        currentDate.setFullYear(currentDate.getFullYear() - n)
      }
      currentDate = new Date(currentDate.setMonth(month))
      // 获得当前月份 0-11
      let currentMonth = currentDate.getMonth()
      // 获得当前年份4位年
      let currentYear = currentDate.getFullYear()
      // 获得上一个月的第一天
      let currentMonthFirstDay = new Date(currentYear, currentMonth, 1).Format(this.format)
      // 获得上一月的最后一天
      let currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0).setHours(23, 59, 59)
      currentMonthLastDay = new Date(currentMonthLastDay).Format(this.format)
      startStop.push(currentMonthFirstDay)
      startStop.push(currentMonthLastDay)
      return startStop
    },

    // 获取本月日期 weekCount：0当本周、-1上一周、1下一周
    getWeekStartAndEnd (weekCount = 0) {
      let startStop = []
      let now = new Date()
      let nowTime = now.getTime()
      let day = now.getDay()  // 本周的第几天
      let MondayTime = nowTime - (day - 1) * oneDay + (weekCount * 7 * oneDay)
      let SundayTime = nowTime + (7 - day) * oneDay + (weekCount * 7 * oneDay)
      let start = new Date(MondayTime).setHours(0, 0, 0)
      let end = new Date(SundayTime).setHours(23, 59, 59)
      start = new Date(start).Format(this.format)
      end = new Date(end).Format(this.format)
      startStop.push(start)
      startStop.push(end)
      return startStop
    },

    // 2018-1-1 00:00 转换为 Wed Jul 25 2018 14:11:22 GMT+0800 (中国标准时间)
    formatDate (data) {
      let time = data.split(' ')
      let sdate = time[0].split('-')
      let date = new Date(sdate[0], sdate[1] - 1, sdate[2])
      if (time[1]) {
        let stime = time[1].split(':')
        date.setHours(...stime)
      }
      return date
    },
    onChange (e) {
      // 不是切换状态时改变日期，清空选中tag状态
      // console.log(this.radio)
      // console.log(this.isSelectTag)
      // if (this.radio && !this.isSelectTag) this.radio = ''
      // this.$emit('on-change', [this.startDate, this.endDate])
      // // 操作结束关闭tag切换状态
      // setTimeout(() => {
      //   this.isSelectTag = false
      // }, 100)
    }
  },
  created () {
    if (this.defaultSelect) {
      this.tagSync = true
      this.radio = this.defaultSelect
      this.selectTag(this.defaultSelect, ...this.allQuickList.filter(item => item.value === this.radio))
    } else {
      this.synchrodata()
    }
  }
}
</script>

<style lang="less" scoped>
  .smy__datetime-range {
    padding: 0 1.2rem;

    .title {
      margin: 0.8rem 0;

      .weui-label {
        font-size: 12.5/12.5rem;
      }
    }
    .title-border {
      margin-top: 0.8rem;
    }

    .datetime-range-body {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #f2f2f2;

      .datetime-body {
        flex: 1;
        text-align: center;
        box-sizing: border-box;

        .weui-cell {
          display: inline-block;
          padding: 5/12.5rem 15/12.5rem;
        }

        .click-area {
          text-align: center;
          display: block;
          width: 100%;

          .placeholder {
            color: #7f8184;
          }
        }
      }
    }
    .tag-select {
      padding: 0.8rem 0rem 0rem;
      position: relative;

      .default-item {
        font-size: 11/12.5rem;
        display: inline-block;
        width: 6.4rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border-radius: 3/12.5rem;
        background-color: #f8f8f8;
        color: #7f8184;
        margin-bottom: 0.8rem;
        margin-right: 0.4rem;
        border: 1px solid transparent;
      }
      .default-item:nth-child(4n) {
        margin-right: 0rem;
      }
      .selected-item {
        border-color: #3ccba6;
        color: #3ccba6;
        background: #e8f9f0;
      }
    }
  }
  .border {
    padding-top: .4rem;
  }
  .border::before {
    content: ' ';
    border-top: 1px solid #eee;
    width: 100%;
    display: block;
    position: absolute;
  }
</style>
