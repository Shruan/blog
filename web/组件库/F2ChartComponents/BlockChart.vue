<template>
  <div class="chart-wrapper">
    <!-- {{activeData}} -->
    <div
      v-show="showTitle"
      class="header-body">
      <div class="title font-size-h3-large">
        {{title}}
      </div>
      <div class="total font-size-h1-large">
        <template v-if="!hasSlotsTotal">
          {{total || 0}}
        </template>
        <slot name="total"></slot>
      </div>
    </div>
    <slot name="middle"></slot>
    <div
      class="chart-canvas"
      :class="{'chart-canvas-border': activeData.length === 0}">
      <div
        v-show="item.checked"
        class="chart-content font-size-h4-normal"
        v-for="(item, index) in activeData"
        :key="index"
        :style="{
        width: item.percent,
        background: currColor[index]
      }">
        {{showCount ? item.percent : ''}}
      </div>
      <div
        class="no-data"
        v-show="activeData.length === 0">
        无数据
      </div>
    </div>
    <div class="label-body">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="label"
        @click="onChange(item, index)"
      >
        <i
          class="icon"
          :style="{
            borderColor: item.checked ? currColor[index] : '#d7d7d7'
          }"
        />
        <label
          class="text font-size-h4-large"
          :class="{ default: !item.checked }"
        >{{item.name}}</label>
      </div>
    </div>
  </div>
</template>

<script>
// import F2 from '@antv/f2'
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    // 设置别名 { London: '伦敦', Tokyo: 'toni' }
    alias: {
      type: Object
    },
    colors: {
      type: Array,
      default: () => {
        return [
          '#ef6149', '#f5813d', '#fca032', '#ff7f0f', '#ffb215', '#ffe51b',
          '#4bc983', '#69db6f', '#87ec5b', '#569ff3', '#78bef1', '#9bddef',
          '#f2795b', '#f7a04c', '#fcc73d', '#ffb84d', '#ffd46c', '#fff18b',
          '#5ed298', '#84e187', '#a9f076', '#6caff5', '#97c9f3', '#c2e3f2',
          '#f5916d', '#f9b55b', '#fdd84a', '#ffc65c', '#ffdd81', '#fff4a6',
          '#71dbad', '#9ee7a0', '#cbf293', '#82bff7', '#b4d4f6', '#e6e9f5'
        ]
      }
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    showCount: {
      type: Boolean,
      default: false
    },
    anotherColors: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      total: 0,
      hasSlotsTotal: false,
      defaultColor: [
        '#569ff3', '#78bef1', '#9bddef', '#4bc983', '#69db6f', '#87ec5b',
        '#ff7f0f', '#ffb215', '#ffe51b', '#ef6149', '#f5813d', '#fca032',
        '#6caff5', '#97c9f3', '#c2e3f2', '#5ed298', '#84e187', '#a9f076',
        '#ffb84d', '#ffd46c', '#fff18b', '#f2795b', '#f7a04c', '#fcc73d',
        '#82bff7', '#b4d4f6', '#e6e9f5', '#71dbad', '#9ee7a0', '#cbf293',
        '#ffc65c', '#ffdd81', '#fff4a6', '#f5916d', '#f9b55b', '#fdd84a'
      ]
    }
  },
  computed: {
    // 激活选项数据
    activeData () {
      let total = 0
      if (this.list.length > 0) {
        total = this.list.filter(item => item.checked).map(item => item.value).reduce((item1, item2) => item1 + item2)
      }
      this.total = total // 根据激活总数
      let data = this.list.map((item, index) => {
        if (item.checked) {
          item.percent = (item.value / total * 100 || 0).toFixed(1) + '%'
        } else {
          item.percent = 0
        }
        return item
      })
      return data
    },
    currColor () {
      if (this.anotherColors) {
        return this.defaultColor
      } else {
        return this.colors
      }
    }
  },
  watch: {
    data (val, oldVal) {
      if (val.length > 0) {
        this.list = this.dataFormat(this.data)
      } else {
        this.list = []
      }
    }
  },
  methods: {
    dataFormat (data) {
      let total = 0
      if (data.length > 0) {
        total = data.map(item => item.value).reduce((item1, item2) => item1 + item2)
      }
      // this.total = total  // 全部工单总数
      let data2 = data.map((item, index) => {
        item.percent = (item.value / total * 100 || 0).toFixed(1)
        item.checked = true
        return item
      })
      return data2
    },
    onChange (item, index) {
      let list = this.list.filter(item => item.checked)
      if (list.length === 1 && item.checked) return
      let obj = item
      obj.checked = !obj.checked
      this.$set(this.list, index, obj)
      this.$emit('un-checked-change', this.list.filter(item => !item.checked))
    }
  },
  created () {
    if (this.data.length > 0) {
      this.list = this.dataFormat(this.data)
    } else {
      this.list = []
    }
  },
  mounted () {
    this.$slots.total && (this.hasSlotsTotal = true)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .chart-wrapper {
    transition: .5s;
    padding: .6rem 1rem;

    .header-body {
      padding-left: .4rem;
      margin-bottom: .2rem;
    }
    .chart-canvas-border {
      border: 1px solid #f2f2f2;
    }
    .chart-canvas {
      position: relative;
      display: flex;
      transition: .5s;
      height: 1.6rem;
      border-radius: 1rem;
      overflow: hidden;

      .no-data {
        color: #ededed;
        text-align: center;
        flex: 1;
      }

      .chart-content {
        border-right: .002rem solid #f2f2f2;
        text-align: center;
        line-height: 1.6rem;
        color: #fff;
      }

      .chart-content:last-child {
        border-right: none;
      }
      //
      // .chart-content:after{
      //   content: "";
      //   position: absolute;
      //   border-right: 1px solid #fff;
      //   height: 100%;
      //   transform: 0 0;
      //   transform: scale(0.5,1);
      //   box-sizing: border-box;
      // }
    }

    .label-body {
      display: flex;
      flex-wrap: wrap;

      .label {
        margin-top: .4rem;
        margin-right: .8rem;
        display: inline-block;

        .icon {
          display: inline-block;
          width: 8px;
          height: 8px;
          border: 2px solid #fff;
          border-radius: 50%;
        }

        .text {
          display: inline-block;
          vertical-align: text-bottom;
        }

        .default {
          color: #d1d2d4;
        }
      }
    }
  }
</style>
