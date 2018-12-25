<template>
  <div class="chart-wrapper">
    <span
      v-if="!data || data.length === 0"
      class="no-result">
      <img class="img" src="/spa_static_mobile/icon/none.png">
    </span>
    <canvas
      v-else
      class="chart-canvas"
      :id="cid"
      :style="{ height: `${height ? height : ''}px` }"
    ></canvas>
  </div>
</template>

<script>
// import F2 from '@antv/f2'
const F2 = require('@antv/f2/lib/index')
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar')

F2.Chart.plugins.register(ScrollBar)
// 引入所有的交互行为
require('@antv/f2/lib/interaction/')

export default {
  data () {
    return {
      chart: null,
      min: '',
      max: '',
      originDates: [],
      originValues: []
    }
  },
  props: {
    height: {
      type: Number
    },
    data: {
      type: Array,
      required: true
    },
    // 设置别名 { London: '伦敦', Tokyo: 'toni' }
    alias: {
      type: Object
    },
    // 绑定div上的唯一id选择选择器
    cid: String,
    // 纵坐标间隔
    tickInterval: {
      type: Number,
      default: 3
    },
    // 日期格式化
    mask: {
      type: String
    },
    // 显示 线性点
    showPoint: {
      type: Boolean,
      default: false
    },
    // 显示滚动条
    showScrollBar: {
      type: Boolean,
      default: false
    },
    // 开启缩放
    openPinch: {
      type: Boolean,
      default: false
    },
    // 关闭图表渲染动画
    stopAnimate: {
      type: Boolean,
      default: false
    },
    defaultColor: {
      type: Array,
      default: () => {
        return [ '#7fdaae', '#f49380', '#f1756d', '#88bff7', '#ffc571' ]
      }
    }
  },
  // watch: {
  //   data (val, oldVal) {
  //     console.log('new: %s, old: %s', val, oldVal)
  //     this.drawChart(val)
  //   }
  // },
  created () {
    // this.drawChart()
  },
  mounted () {
    this.$nextTick(() => {
      this.reload()
    })
  },
  methods: {
    reload () {
      if (!this.data || this.data.length === 0) return // 数据不存在 或 为0 不处理
      let data = JSON.parse(JSON.stringify(this.data))
      // 可视数据范围
      let originDates = []
      let originValues = []
      // 别名设置
      if (this.alias) {
        data = data.map(item => {
          item.name = this.alias[item.name] || item.name
          originDates.push(item.abscissa)
          originValues.push(item.value)
          return item
        })
      }
      // this.originDates = Array.from(new Set(originDates))
      this.originValues = Array.from(new Set(originValues))
      // 可视数据超过7条 截取最后7条数据
      // if (this.originDates.length > 7) {
      //   this.originDates = this.originDates.filter(item => item > this.originDates[this.originDates.length - 8])
      // }
      this.drawChart(data)
    },
    drawChart (data) {
      try {
        if (document.getElementById(this.cid)) {
          this.chart && this.chart.destroy()
          this.chart = new F2.Chart({
            id: this.cid,
            pixelRatio: window.devicePixelRatio,
            limitInPlot: true,
            animate: !this.stopAnimate // 关闭动画
          })
          // 为 x 字段设置列定义

          this.chart.source(data, {
            value: {
              // tickInterval: this.tickInterval,
              min: Math.min.apply(null, this.originValues),
              max: Math.max.apply(null, this.originValues)
            },
            abscissa: {
              type: 'timeCat',
              mask: this.mask,
              // values: this.originDates,
              // nice: false,
              range: [0, 1],
              tickCount: 7 // 如果你要根据以上 mask 的根式显示四件，建议使用 3 个就好
            }
          })
          this.chart.tooltip({
            showCrosshairs: true
          })
          // this.chart.tooltip(false) // 初始状态关闭 tooltip
          this.chart.legend(true) // 不使用默认图例
          // this.chart.legend({
          //   marker: function marker (x, y, r, ctx) {
          //     ctx.lineWidth = 1
          //     ctx.strokeStyle = ctx.fillStyle
          //     ctx.moveTo(x - r - 3, y)
          //     ctx.lineTo(x + r + 3, y)
          //     ctx.stroke()
          //     ctx.arc(x, y, r, 0, Math.PI * 2, false)
          //     ctx.fill()
          //   }
          // })
          this.chart.axis('abscissa', {
            label: (text, index, total) => {
              let obj = {
                textAlign: 'center',
                text: text
              }
              if (this.mask) {
                // let str = text + ''
                // console.log(text)
                // let label = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 9)
                // console.log(label)
                // obj.text = new Date(text).Format(this.mask)
              }
              return obj
            }
          })

          if (this.showScrollBar) {
            // 定义进度条
            this.chart.scrollBar({
              mode: 'x',
              xStyle: {
                offsetY: -5
              }
            })
          }

          this.chart.line().position('abscissa*value').color('name', this.defaultColor).animate({
            appear: {
              duration: 500
            },
            update: {
              animation: 'lineUpdate',
              duration: 500
            }
          })
          // 线性表 点
          if (this.showPoint) {
            let setStyle = this.chart.point().position('abscissa*value').color('name', this.defaultColor)
            if (setStyle) {
              setStyle.style({
                lineWidth: 1,
                stroke: '#fff'
              })
            }
            // .shape('smooth')
          }
          // 图表拖拽
          this.chart.interaction('pan')
          if (this.openPinch) this.chart.interaction('pinch')
          this.chart.render()
        }
      } catch (e) {
        console.log('线性图DOM节点已销毁...')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .chart-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .no-result {
      color: #999;
      width: 18rem;

      > .img {
        width: 100%;
        height: 100%;
      }
    }

    .chart-canvas {
      width: 100%;
    }
  }
</style>
