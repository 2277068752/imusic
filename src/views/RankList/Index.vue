<template>
  <div class="rank-page">
    <i-scroll :data="rankListData"
              ref="listview"
              class="rank-view">
      <div class="rank-list">
        <template v-for="(item,index) in rankListData">
          <div class="item">
            <div class="icon">
              <img v-lazy="item.picUrl"/>
            </div>
            <ul class="song-list">
              <template v-for="(song, key) in item.songList">
                <li class="song-item">{{key + 1}} {{song.songname}}-{{song.singername}}</li>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </i-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
  import BLL from './Index'
  import iScroll from '../../components/better-scroll/iScroll.vue'

  export default {
    components: {iScroll},
    data () {
      return {
        rankListData: [],
        topMargin: 88
      }
    },
    created () {
      this.BLL = new BLL(this)
    },
    mounted () {
      this.getRankList()
    },
    methods: {
      getRankList () {
        this.BLL.getRankList()
      }
    }
  }
</script>

<style lang="scss">
  @import "./Index";
</style>
