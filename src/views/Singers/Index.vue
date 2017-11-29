<template>
  <div class="singer-page">
    <i-scroll :data="singerList"
              ref="listview"
              class="singer-ivew"
              @scroll="scroll"
              :topMargin="topMargin"
              :probeType="probeType"
              :listenScroll="listenScroll">
      <ul class="singer-list">
        <template v-for="(item,index) in singerList">
          <li class="item" ref="listGroup">
            <h2>{{item.title}}</h2>
            <template v-for="(singer,index) in item.items">
              <div class="singer">
                <img v-lazy="singer.avatar"/>
                <span>{{singer.name}}</span>
              </div>
            </template>
          </li>
        </template>
      </ul>
      <div class="shortcut-list"
           @touchstart="onShortcutClick"
           @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <template v-for="(item,index) in shortcutList">
            <li class="item" :data-index="index" :class="{'current': currentIndex === index}">{{item}}</li>
          </template>
        </ul>
      </div>
      <div class="list-fixed" v-show="fixedTitle" ref="fixed">
        <h2 class="fixed-title">{{ fixedTitle }}</h2>
      </div>
    </i-scroll>
  </div>
</template>
<script>
  import iScroll from '../../components/better-scroll/iScroll.vue'
  import BLL from './Index'

  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18
  export default {
    components: {iScroll},
    data () {
      return {
        singerList: [], // 歌手列表
        probeType: 3,
        listenScroll: true,
        scrollY: -1,
        topMargin: 88,
        HOT_NAME: '热门', // 歌手顶部的列表名
        HOT_SINGER_LEN: 10, // 热门歌手的个数
        currentIndex: 0,
        listHeight: [],
        diff: -1,
        touch: {}
      }
    },
    created () {
      this.BLL = new BLL(this)
    },
    mounted () {
      this.$loading('123', 'show')
      this.getSingerList()
    },
    computed: {
      // 标题固定在顶部的计算
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.singerList[this.currentIndex] ? this.singerList[this.currentIndex].title : ''
      },
      // 右边快速滑条数值（只有一个）
      shortcutList () {
        return this.singerList.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    watch: {
      // 滚动监听
      scrollY (newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在列表中间滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且 -newY > 最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      // 处理title
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0`
      },
      singerList () {
        setTimeout(() => {
          this.calculateHeight()
        }, 20)
      }
    },
    methods: {
      // 取歌手列表
      getSingerList () {
        this.BLL.getSingerList()
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      // 计算每个区块的高度
      calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      // 点击跳转到相应的区块（如点击B跳转到B姓歌手的区域）
      onShortcutClick (e) {
        let index = this.$utils.Common.getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.index = index
        this.scrollTo(index)
      },
      // 持续滑动跳转到相应的区块（如一直滑到 Z 跳到 Z 姓歌手的区域）
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this.scrollTo(anchorIndex)
      },
      // 点击字母跳到相应的区块
      scrollTo (index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    }
  }
</script>

<style lang="scss">
  @import "./Index";
</style>
