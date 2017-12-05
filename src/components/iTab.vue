<template>
  <div class="tab-comp">
    <template v-for="(item,index) in tabData">
      <div class="item" @click="tabSelect(item)">
        <span :class="tabActive===item.key?'active':''">{{item.label}}</span>
      </div>
    </template>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    components: {},
    data () {
      return {
        tabData: [
          {
            key: '1',
            label: '推荐',
            link: '/recommend'
          },
          {
            key: '2',
            label: '歌手',
            link: '/singer'
          },
          {
            key: '3',
            label: '排行',
            link: '/rank'
          },
          {
            key: '4',
            label: '搜索',
            link: '/search'
          }
        ], // tab数据
        tabActive: '1' // 当前触发的tab
      }
    },
    created () {},
    mounted () {
      // 根据当前路由，判断tab
      this.currSelectTab()
    },
    computed: {
      ...mapState({
        path: ({global}) => global.currPath
      })
    },
    methods: {
      tabSelect (item) {
        this.tabActive = item.key
        // 路由跳转
        this.$router.push({path: item.link})
      },
      currSelectTab () {
        // let path = this.$route.path
        console.log('path:', this.path)
        switch (this.path) {
          case '/':
          case '/recommend':
            this.tabActive = '1'
            break
          case '/singer':
            this.tabActive = '2'
            break
          case '/rank':
            this.tabActive = '3'
            break
          case '/search':
            this.tabActive = '4'
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global/_fonts";
  @import "../assets/styles/global/_variable";

  .tab-comp {
    position: fixed;
    top: 88px;
    left: 0;
    width: 100%;
    z-index: 2;
    height: 88px;
    display: flex;
    .item {
      flex: 0 0 25%;
      line-height: 88px;
      text-align: center;
      font-size: $font-size-l;
      span {
        padding-bottom: 5px;
        color: rgba(255, 255, 255, 0.3);
        &.active {
          color: $main-font-color;
          border-bottom: 2px solid $main-font-color;
        }
      }
    }
  }
</style>
