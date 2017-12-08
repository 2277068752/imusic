<template>
  <transition name="slide">
    <div class="singer-detail-page">
      <!--region 歌手图片-->
      <div class="header" ref="header">
        <div class="back" @click="backGo()">
          <span class="axon-icon" v-html="'&#xe609;'"></span>
        </div>
        <div class="title">
          <span>{{singerInfo.name}}</span>
        </div>
      </div>
      <div class="singer-img" id="bgImage" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper">
          <div class="play"><span class="axon-icon" v-html="'&#xe61e;'"></span><span class="text">随机播放全部</span></div>
        </div>
        <div class="filter"></div>
      </div>
      <!--endregion-->
      <!--region 歌曲列表-->
      <i-scroll :data="songListData"
                ref="songList"
                :probeType="probeType"
                @scroll="scroll"
                :listen-scroll="listenScroll"
                :topMargin="topMargin"
                class="song-list-of-singer">
        <div class="song-list">
          <ul>
            <template v-for="(song, index) in songListData">
              <li class="song-item">
                <div class="song-content">
                  <p class="name">{{song.name}}</p>
                  <p class="singer">{{song.singer}}</p>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </i-scroll>
      <!--endregion-->
    </div>
  </transition>
</template>
<script>
  import { mapState } from 'vuex'
  import BLL from '../Index'
  import iScroll from '../../../components/better-scroll/iScroll.vue'

  export default {
    components: {iScroll},
    data () {
      return {
        songListData: [],
        topMargin: 0,
        scrollY: 0,
        probeType: 3,
        listenScroll: true
      }
    },
    created () {
      this.BLL = new BLL(this)
    },
    mounted () {
      if (this.singerInfo) {
        this.getSongListBySingerId()
      }
      this.SingerIconHeight = this.$refs.bgImage.clientHeight // 取 歌手图片的 高度
      this.HeaderHeight = this.$refs.header.clientHeight // 取 顶部头的 高度
      this.mainTranslateY = -this.SingerIconHeight + this.HeaderHeight
      this.$refs.songList.$el.style.top = `${this.SingerIconHeight}px`
    },
    computed: {
      ...mapState({
        singerInfo: ({singer}) => singer.singerInfo
      }),
      bgStyle () {
        return `background-image: url(${this.singerInfo.avatar})`
      }
    },
    watch: {
      scrollY (newY) {
        let translateY = Math.max(this.mainTranslateY, newY)
        this.$refs.songList.$el.style.transform = `translate3d(0, ${translateY}px, 0)`
        if (newY > 0) {
          // 图片放大的百分比（percent）
          const percent = Math.abs(newY / this.SingerIconHeight)
          let scale = 1 + percent
          this.$refs.bgImage.style.transform = `scale(${scale})`
        }
      }
    },
    methods: {
      // 根据
      getSongListBySingerId () {
        this.BLL.getSongListBySingerId()
      },
      // 返回
      backGo () {
        this.$router.back()
      },
      scroll (pos) {
        this.scrollY = pos.y
      }
    }
  }
</script>

<style lang="scss">
  @import "./Index";
</style>
