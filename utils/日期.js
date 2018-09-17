const getDateRange = {
  format: 'yyyy-MM-dd hh:mm',
  oneDay: 24 * 60 * 60 * 1000,
  // 在date原型链上增加格式化日期方法Format
  setDateProtoType: function () {
    /* eslint-disable no-extend-native */
    Date.prototype.Format = function (fmt) {
      // 日期格式化
      var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }
  }(),
  // 获取当前时刻起间隔count天日期 count：3未来三天、-3过去三天
  getIntervalDayStartAndEnd: function (count = 0, format = this.format) {
    let dateRange = []
    let currentDate = new Date()
    let start = currentDate.Format(format)
    let end = new Date(currentDate.setTime(currentDate.getTime() + this.oneDay * count)).Format(format)
    dateRange.push(start)
    dateRange.push(end)
    return count > 0 ? dateRange : dateRange.reverse()
  },

  // 获取今天日期 count：0今天、-1昨天、1明天
  getDayStartAndEnd: function (count = 0, format = this.format) {
    let dateRange = []
    let start = new Date(new Date().setHours(0, 0, 0) + this.oneDay * count).Format(format)
    let end = new Date(new Date().setHours(23, 59, 59) + this.oneDay * count).Format(format)
    dateRange.push(start)
    dateRange.push(end)
    return dateRange
  },

  // 获取本月日期 count：0当前月、-1上一个月、1下一个月
  getMonthStartAndEnd: function (count = 0, format = this.format) {
    let dateRange = []
    let currentDate = new Date()
    let month = currentDate.getMonth() + count
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
    let currentMonthFirstDay = new Date(currentYear, currentMonth, 1).Format(format)
    // 获得上一月的最后一天
    let currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0).setHours(23, 59, 59)
    currentMonthLastDay = new Date(currentMonthLastDay).Format(format)
    dateRange.push(currentMonthFirstDay)
    dateRange.push(currentMonthLastDay)
    return dateRange
  },

  // 获取本月日期 count：0当本周、-1上一周、1下一周
  getWeekStartAndEnd: function (count = 0, format = this.format) {
    let dateRange = []
    let currentDate = new Date()
    let currentTime = currentDate.getTime()
    let currentDay = currentDate.getDay()  // 本周的第几天
    let MondayTime = currentTime - (currentDay - 1) * this.oneDay + (count * 7 * this.oneDay)
    let SundayTime = currentTime + (7 - currentDay) * this.oneDay + (count * 7 * this.oneDay)
    let start = new Date(MondayTime).setHours(0, 0, 0)
    let end = new Date(SundayTime).setHours(23, 59, 59)
    start = new Date(start).Format(format)
    end = new Date(end).Format(format)
    dateRange.push(start)
    dateRange.push(end)
    return dateRange
  },

  // 2018-1-1 00:00 转换为 Wed Jul 25 2018 14:11:22 GMT+0800 (中国标准时间)
  formatDate: function (data) {
    let time = data.split(' ')
    let sdate = time[0].split('-')
    let date = new Date(sdate[0], sdate[1] - 1, sdate[2])
    if (time[1]) {
      let stime = time[1].split(':')
      date.setHours(...stime)
    }
    return date
  }
}
export default getDateRange
