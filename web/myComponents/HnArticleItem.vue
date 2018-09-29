<template>
  <div>
    <div class="articleList-box" v-for='item in articleList'>
      <div class="articleList-img">
        <div v-if="item.img !=''" class="article-img" :style="'background-image:url('+item.img+')'"></div>
        <template v-else="item.img ==''">
          <div class="article-img" style="background-image:url('http://img.holdno.com/activitydefaultbackground1.jpg')"></div>
        </template>
      </div>
      <div class="articleList-content">
        <time class="article-time">{{item.create_time}}</time>
        <h3 class="article-title">{{item.title}}</h3>
        <p class="article-content" v-html="item.content"></p>
        <div class="more-btn">
          <router-link :to="{ path: '/home/editArticle', query: {edit: true, id:item.id}}">编辑</router-link>
          <router-link :to="{ path: '/articleDetail', query: {id: item.id}}">查看详情</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import holdno from '@/lib/utils'
export default {
  components: {

  },
  props: {
    articleList: {},
    totalTab: Number,
    pageSize: Number,
    page: Number,
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.articleList-box:nth-last-of-type(2n+1){
  flex-direction: row-reverse
}*/
.article-content {
  color: #a1a0a5;
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  letter-spacing: 1px;
  font-size: 12px;
  width: 342px;
}
.article-time {
  color: #928686;
  letter-spacing: 5px;
  font-size: 12px;
}
.article-title {
  font-size: 20px;
  padding: 10px 25px 0;
  line-height: 28px;
}
.article-title::after {
  padding: 20px;
  content: '\ ';
  margin: 0 50px;
  display: block;
  background: url(https://www.jihe.pro/wap/img/ticketline.png) no-repeat center;
  position: relative;
  background-color: #fff;
}
.articleList-content {
  padding: 15px 50px;
  text-align: center;
  line-height: 24px;
}
.articleList-box {
  border: 1px solid silver;
  box-shadow: 0 0 2px #888888;
  border-radius: 5px;
  height: 250px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
}
.articleList-img {
  width: 450px;
  height: 250px;
}
.article-img {
  border-radius:5px;
  width: 450px;
  height: 250px;
  background-size: cover;
  background-position: center;
}
.more-btn{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.more-btn > a{
  margin-left: 15px;
}
</style>
