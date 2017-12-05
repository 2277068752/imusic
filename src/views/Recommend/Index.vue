<template>
  <div class="recommend-page">
    <i-scroll :data="listData"
              ref="listview"
              class="recommend-view">
      <div>
        <!--region banner-->
        <div class="banner slide-wrapper">
          <div class="slide-content">
            <i-slide ref="banner-slide"
                     :loop="slideOptions.loop"
                     :autoPlay="slideOptions.autoPlay"
                     :showDot="slideOptions.showDot"
                     :speed="slideOptions.speed">
              <template v-for="(item,index) in bannerData">
                <div class="banner-img" :style="{background: 'url('+ item.picUrl +')',backgroundSize:'100% 100%'}">
                  <a :href="item.linkUrl"></a>
                </div>
              </template>
            </i-slide>
          </div>
        </div>
        <!--endregion-->
        <div class="rand-list">
          <div class="rand-title">热门歌单推荐</div>
          <div class="list">
            <template v-for="(item,index) in listData">
              <div class="item">
                <div class="icon">
                  <img v-lazy="item.imgurl"/>
                </div>
                <div class="desc-and-title">
                  <h2 class="title">{{item.creator.name}}</h2>
                  <p class="desc">{{item.dissname}}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </i-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
  import BLL from './Index'
  import iSlide from '../../components/better-scroll/iSlide.vue'
  import ListDataJson from '../../../static/Json/recommendData.json'
  import iScroll from '../../components/better-scroll/iScroll.vue'

  export default {
    components: {iSlide, iScroll},
    data () {
      return {
        singerList: [], // 歌手列表
        slideOptions: {
          loop: true,
          autoPlay: true,
          showDot: true,
          speed: 400
        }, // banner-slide 参数控制
        bannerData: [], // banner 数据
        listData: ListDataJson.data.list // 列表数据
      }
    },
    created () {
      this.BLL = new BLL(this)
    },
    mounted () {
      this.getRankData()
    },
    computed: {},
    watch: {},
    methods: {
      getRankData () {
        this.BLL.getRecommendList()
      }
    }
  }
</script>

<style lang="scss">
  @import "Index";
</style>
