<template>
  <div class="hn-activity-item" style="width:900px;margin-bottom:50px;">
    <div class="hn-activity" v-for="(act,index) in activity">
    <!-- <div class="hn-activity" v-for="(act,index) in activity" @mouseenter='showQrcode(index)' @mouseleave='hideQrcode(index)'> -->
      <!-- <router-link  :to="{path: '/home/registList', query: {id: act.id}}" style="display:flex"> -->
        <div class="activity-img-bg">
          <div v-if="act.img !=''" class="activity-img" :style="'background-image:url('+act.img+')'"></div>
          <template v-else="act.img ==''">
            <div class="activity-img" style="background-image:url('http://img.holdno.com/activitydefaultbackground1.jpg')"></div>
          </template>
          <vue-qrcode :value="activityQrcode+act.id" :options="{ size: 135 }" class='qrcode'></vue-qrcode>
        </div>
        <div class="activity-msg">
          <div class="activity-user">
            <div>
              <img :src="act.user.head" style="width:40px;border-radius:50px;">
            </div>
            <div class="activity-user-name">
              {{act.user.name}}
            </div>
          </div>
          <div class="activity-title" :title="act.title">
            {{act.title}}
          </div>
          <!-- <div class="activity-address" :title="act.address">
            活动地址：{{act.address}}
          </div> -->
          <div style="color:rgb(119, 125, 134)">
            {{act.act_status}}
          </div>
        </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
import holdno from '@/lib/utils'

export default {
  components: {
    VueQrcode
  },
  props: {
    activity: {}
  },
  data () {
    return {
      // isQrcode: [],
      activityQrcode: ''
    }
  },
  created () {
    // let len = this.activity.length
    // for(let i = 0; i < len; i++ ){
    //   this.isQrcode[i] = false
    //   console.log(this.isQrcode[i])
    // }
    this.activityQrcode = 'https://www.jihe.pro/Wap/?#/activity/info?id='
  },
  updated () {
    // this.showQrcode()
  },
  methods: {
    // showQrcode (index) {
    //   document.getElementsByClassName('activity-img')[index].style.display = 'none'
    //   document.getElementsByClassName('qrcode')[index].style.display = 'block'
    // },
    // hideQrcode (index) {
    //   document.getElementsByClassName('activity-img')[index].style.display = 'block'
    //   document.getElementsByClassName('qrcode')[index].style.display = 'none'
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity-address,.activity-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  letter-spacing: 1px;
}
.qrcode {
  display: none;
  margin-top: 13px;
}
.activity-user-name {
  padding-top: 10px;
  margin-left: 15px;
}
.activity-user {
  display: flex;
  line-height: 15px;
}
.activity-msg {
  width: 275px;
  padding: 15px 30px;
  height: 160px;
  box-sizing: border-box;
}
.activity-title {
  -webkit-line-clamp: 2;
  font-size: 16px;
  line-height: 25px;
  min-height: 50px;
  margin-top: 10px;
}
.activity-img-bg {
  height: 160px;
  display: flex;
  justify-content: center;
  -webkit-transition: all cubic-bezier(0.39, 0.58, 0.57, 1) 520ms;
}
.activity-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.hn-activity:hover .activity-img {
  display: none;
}
.hn-activity:hover .qrcode {
  display: block;
  -webkit-transition: all cubic-bezier(0.39, 0.58, 0.57, 1) 520ms;
}
.hn-activity:hover .activity-img-bg {
  background-color: #fff;
}
.hn-activity:hover {
  background-color: #fff;
  cursor: pointer;
}
.hn-activity {
  display: flex;
  overflow: hidden;
  width: 280px;
  margin:30px 0 0;
  border-radius: 5px;
  /*height: 160px;*/
  flex-flow: column nowrap;
  /*border: 1px solid silver;*/
  background-color: #F9FAFC;
  -webkit-transition: all cubic-bezier(0.39, 0.58, 0.57, 1) 520ms;
}
.hn-activity-item {
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  flex-flow: row wrap;
  box-sizing: border-box;
  line-height: 30px;
}
</style>
