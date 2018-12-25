<template lang="html">
  <div class="grid-body">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      default: 4
    },
    height: {
      type: Number
    },
    iconBackground: {
      type: String,
      default: 'none'
    }
  }
}
</script>

<style lang="less" scoped>
  .grid-body {
    display: flex;
    flex-wrap: wrap;
  }
</style>
