<template lang="html">
  <a href="javascript:;"
    class="grid-list"
    :style="{
      width: 100 / $parent.cols + '%',
      height: $parent.height ? $parent.height + 'px' : ''
    }">
    <div
      class="grid-icon"
      :style="{
        background: $parent.iconBackground
      }">
      <slot v-if="hasIconSlot" name="icon" />
      <slot
        v-if="hasNumSlot"
        name="num"
        class="num"
      />
      <span
        v-if="hasTopRightSlot"
        class="top-right">
        <slot
          name="topRight"
          class="top-right"
        />
      </span>
    </div>
    <p v-if="hasLabelSlot" class="grid-label">
      <slot name="label"/>
    </p>
    <slot></slot>
  </a>
</template>

<script>
export default {
  data () {
    return {
      hasIconSlot: false,
      hasLabelSlot: false,
      hasNumSlot: false,
      hasTopRightSlot: false
    }
  },
  mounted () {
    // 判断slot是否存在
    this.$slots.icon && (this.hasIconSlot = true)
    this.$slots.label && (this.hasLabelSlot = true)
    this.$slots.num && (this.hasNumSlot = true)
    this.$slots.topRight && (this.hasTopRightSlot = true)
  }
}
</script>

<style lang="less" scoped>
  .grid-list {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 7rem;


    > .grid-icon {
      overflow: hidden;
      position: relative;
      background: #f8f8f8;
      border-radius: 0.24rem;
      line-height: 3.52rem;
      height: 3.52rem;
      width: 3.52rem;
      margin-bottom: 0.64rem;
      display: flex;
      justify-content: center;

      > .top-right {
        position: absolute;
        line-height: 1;
        right: -35%;
        top: -20%;
      }

      .num {
        font-size: 20/12.5rem;
        font-weight: bold;
        color: #333;
      }
    }
    > .grid-label {
      font-size: 12/12.5rem;
    }
  }

</style>
