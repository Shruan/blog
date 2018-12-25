<template lang="html">
  <div class="content-top"
    :style="{background: background}">
    <div class="list">
      <template v-if="data[1]">
        <div class="header">
          <img class="crown" src="../../assets/icon/crown2.png">
          <YnUserLogo
            show-border
            show-border-effect
            class="header-body"
            :size="4"
            :border-width="2"
            :name="data[1].name"
            :url="data[1].avatar"
          />
          <span class="num-body">
            <span class="num">2</span>
          </span>
        </div>
        <p class="font-size-h3-large name">{{data[1].name}}</p>
        <p class="count font-size-h3-normal">{{data[1].value}}{{unit}}</p>
      </template>
    </div>
    <div class="list">
      <template v-if="data[0]">
        <div class="header">
          <img class="crown" src="../../assets/icon/crown1.png">
          <YnUserLogo
            show-border
            show-border-effect
            class="header-body"
            :size="4"
            :border-width="2"
            :name="data[0].name"
            :url="data[0].avatar"
          />
          <span class="num-body">
            <span class="num">1</span>
          </span>
        </div>
        <p class="font-size-h3-large name">{{data[0].name}}</p>
        <p class="count font-size-h3-normal">{{data[0].value}}{{unit}}</p>
      </template>
    </div>
    <div class="list">
      <template v-if="data[2]">
        <div class="header">
          <img class="crown" src="../../assets/icon/crown3.png">
          <YnUserLogo
            show-border
            show-border-effect
            class="header-body"
            :size="4"
            :border-width="2"
            :name="data[2].name"
            :url="data[2].avatar"
          />
          <span class="num-body">
            <span class="num">3</span>
          </span>
        </div>
        <p class="font-size-h3-large name">{{data[2].name}}</p>
        <p class="count font-size-h3-normal">{{data[2].value}}{{unit}}</p>
      </template>
    </div>
  </div>
</template>

<script>
import YnUserLogo from '@/components/YnUserLogo'
export default {
  components: {
    YnUserLogo
  },
  props: {
    data: Array,
    unit: String,
    background: {
      type: String,
      default: 'rgba(60, 203, 166, .1)'
    }
  }
}
</script>

<style lang="less" scoped>
.content-top {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 12rem;
  padding: 2.5rem 3.6rem 0;

  .list {
    width: 5rem;
    height: 9.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      position: relative;
      width: 5rem;
      height: 5rem;
      margin-bottom: 3/12.5rem;

      .header-body {
        margin: 0 auto;
        // width: 4.4rem;
        // height: 4.4rem;
        // border-radius: 50%;
        // border: 3px solid #fff;
        // overflow: hidden;
      }
      .crown {
        position: absolute;
        width: 1.4rem;
        height: 1.4rem;
        right: .32rem;
        top: -.8rem;
      }
      .num-body {
        position: absolute;
        box-sizing: border-box;
        overflow: hidden;
        right: 0.3rem;
        bottom: 0.8rem;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border: 1px solid #c6d1e1;
        color: #c6d1e1;
        box-shadow: .2rem .2rem .4rem rgba(229, 229, 229, .8);

        > .num {
          flex: 1;
          width: 1.28rem;
          height: 1.28rem;
          line-height: 1.4rem;
          text-align: center;
          font-size: 1.04rem;
        }
      }
    }

    .name {
      color: #7f8184;
    }

    .count {
      color: #3ccba6;
    }
  }
  .list:nth-of-type(2) .header {
    position: relative;
    top: -3/12.5rem;
    transform: scale(1.2);

    .num-body {
      border-color: #fee45b;
      color: #fee45b;
    }
  }
  .list:nth-of-type(3) .header .num-body {
    border-color: #f7aa6e;
    color: #f7aa6e;
  }
}
</style>
