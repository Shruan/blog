<template>
  <div class="chart-wrapper">
    <span
      v-if="!data || data.length === 0"
      class="no-result">
      <img class="img" src="/spa_static_mobile/icon/none.png">
    </span>
    <canvas
      v-else
      :id="cid"
      class="chart-canvas"
      :style="{ height: `${height ? height : ''}px` }"
    ></canvas>
  </div>
</template>

<script>
import F2 from '@antv/f2'
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    // 设置别名 { London: '伦敦', Tokyo: 'toni' }
    alias: {
      type: Object
    },
    // 绑定div上的唯一id选择选择器
    cid: {
      type: String,
      default: 'radar'
    },
    height: {
      type: Number
    },
    mask: {
      type: String
    },
    valueMax: {
      type: Number
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
    // let data = [{
    //   abscissa: 'Design',
    //   name: '用户 A',
    //   value: 70
    // }, {
    //   abscissa: 'Development',
    //   name: '用户 A',
    //   value: 60
    // }, {
    //   abscissa: 'Marketing',
    //   name: '用户 A',
    //   value: 50
    // }, {
    //   abscissa: 'Users',
    //   name: '用户 A',
    //   value: 40
    // }]
    this.$nextTick(() => {
      this.reload()
    })
  },
  methods: {
    reload () {
      if (!this.data || this.data.length === 0) return // 数据不存在 或 为 0 不处理
      let data = JSON.parse(JSON.stringify(this.data)) // 深拷贝
      if (this.alias) {
        data = data.map(item => {
          item.abscissa = this.alias[item.abscissa] || item.abscissa
          return item
        })
      }
      this.drawChart(data)
    },
    drawChart (data) {
      try {
        this.chart && this.chart.destroy()
        if (document.getElementById(this.cid)) {
          this.chart = new F2.Chart({
            id: this.cid,
            pixelRatio: window.devicePixelRatio
          })
          this.chart.coord('polar')
          let valueOption = {
            min: 0,
            nice: false,
            tickCount: 5
          }
          if (this.valueMax) valueOption.max = this.valueMax
          this.chart.source(data, {
            value: valueOption
          })
          this.chart.tooltip({
            onShow: (obj) => {
              let items = obj.items
              items[0].name = items[0].title
            }
          })
          this.chart.axis('value', {
            label: function label (text, index, total) {
              if (index === total - 1) {
                return null
              }
              return {
                top: true
              }
            },
            grid: {
              lineDash: null,
              type: 'arc' // 弧线网格
            }
          })
          this.chart.axis('abscissa', {
            grid: {
              lineDash: null
            }
          })
          this.chart.area().position('abscissa*value').color([
            '#7fdaae', '#f49380', '#f1756d', '#88bff7', '#ffc571'
          ])
          this.chart.line().position('abscissa*value').color([
            '#7fdaae', '#f49380', '#f1756d', '#88bff7', '#ffc571'
          ])
          // this.chart.point().position('abscissa*value').color('name', [
          //   // '#7fdaae', '#f49380', '#f1756d', '#88bff7', '#ffc571'
          // ]).style({
          //   lineWidth: 1,
          //   stroke: '#fff'
          // })
          this.chart.render()
        }
      } catch (e) {
        console.log('雷达图DOM节点已销毁...')
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
