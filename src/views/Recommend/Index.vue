<template>
  <div class="rank-page">
    <!--region banner-->
    <div class="banner slide-wrapper">
      <div class="slide-content">
        <i-slide ref="banner-slide"
                 :loop="slideOptions.loop"
                 :autoPlay="slideOptions.autoPlay"
                 :showDot="slideOptions.showDot"
                 :speed="slideOptions.speed">
          <template v-for="(item,index) in bannerData">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </template>
        </i-slide>
      </div>
    </div>
    <!--endregion-->
    <div class="font">南京安讯科技有限责任公司</div>
  </div>
</template>
<script>
  import BLL from './Index'
  import iSlide from '../../components/better-scroll/iSlide.vue'

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
        bannerData: [] // banner 数据
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
        this.BLL.getRankList()
      }
    }
  }
</script>

<style lang="scss">
  @import "Index";
</style>
