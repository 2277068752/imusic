<template>
  <div class="rank-page wrapper" ref="pageWrapper" :style="{height:pageHeight}">
    <div class="content">
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
  </div>
</template>
<script>
  import BLL from './Index'
  import iSlide from '../../components/better-scroll/iSlide.vue'
  import ListDataJson from '../../../static/Json/recommendData.json'
  import BScroll from 'better-scroll'

  export default {
    components: {iSlide},
    data () {
      return {
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
      this.initPageScroll()
    },
    computed: {
      pageHeight () {
        let pageHeight = this.$utils.Common.getWidthHeight().height - 88 + 'px'
        return pageHeight
      }
    },
    watch: {},
    methods: {
      getRankData () {
        this.BLL.getRankList()
      },
      // 初始化页面滑动
      initPageScroll () {
        // 异步处理数据绑定
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.pageWrapper, {})
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "Index";
</style>
