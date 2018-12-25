<template lang="html">
  <div class="YnUserLogo"
    :style="{
      width: `${count}`,
      height: `${count}`,
      border: showBorder ? `${borderWidth}px solid ${borderColor}` : 'none'
    }"
    :class="{'border-effect': showBorderEffect}"
  >
    <template v-if="flag">
      <div class="username"
        :style="{
            lineHeight: `${count}`,
            fontSize: `${font(size)}`
        }"
      >
      {{userName}}
      </div>
    </template>
    <template v-else>
      <img :src="url" width="100%" height="100%">
    </template>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    borderColor: {
      type: String,
      default: '#fff'
    },
    showBorderEffect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flag: false, // 没有用户头像
      userName: '' // 用户名
    }
  },
  computed: {
    // 计算宽度高度
    count () {
      let sum
      if (this.size === 1) sum = 140
      if (this.size === 2) sum = 80
      if (this.size === 3) sum = 44
      if (this.size === 4) sum = 100
      if (this.size === 5) sum = 50
      let num = parseFloat(sum / 25)
      return num + 'rem'
    }
  },
  watch: {
    url (val) {
      this.load()
    },
    name (val) {
      this.load()
    }
  },
  methods: {
    // 初始化
    load () {
      if (this.size && !this.url) {
        this.flag = true
        let str = this.name
        let n = str.substr(str.length - 2, 2)
        this.userName = n
      } else {
        this.flag = false
      }
    },
    // 字体大小
    font (size) {
      if (size) {
        let n
        if ([1].indexOf(size) !== -1) { n = 36 / 2 + 'px' }
        if ([2, 4].indexOf(size) !== -1) { n = 26 / 2 + 'px' }
        if ([3, 5].indexOf(size) !== -1) { n = 18 / 2 + 'px' }
        return n
      }
    }
  },
  created () {
    this.load()
  }
}
</script>

<style lang="less" scoped>
.YnUserLogo {
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  .username {
      text-align: center;
      background-color: #3ccba6;
      color: white;
      width: 100%;
      height: 100%;
  }

  .circle {
    width:1.12rem;
    height:1.12rem;
    border:2px solid #fff;
    position: absolute;
    right: 0%;
    bottom: 0%;
  }
}
.border-effect {
  box-shadow: 0 0 2rem rgba(229, 229, 229, .8);
}
</style>
