<template>
  <div class="search-page">
    <div class="query-input">
      <search-box v-model="queryVal" placeholder="搜素歌曲、歌手" @query="query"></search-box>
    </div>
    <i-scroll ref="dataList"
              :data="dataList"
              :pullup="pullup"
              @scrollToEnd="searchMore"
              :beforeScroll="beforeScroll"
              :listenScroll="listenScroll"
              :topMargin="topMargin"
              @beforeScroll="listScroll">
      <ul v-show="dataList.length > 0">
        <template v-for="(item,index) in dataList">
          <li @click="selectItem(item)" class="item">
            <label v-if="item.type==='singer'">
               <span class="axon-icon"
                     v-html="'&#xe647;'"></span>
              <span>{{item.singername}}</span>
            </label>
            <label v-else>
              <span class="axon-icon" v-html="'&#xe612;'"></span>
              <span>{{item.name}} - {{item.singer}}</span>
            </label>
          </li>
        </template>
        <!--region loading more-->
        <div class="loading" slot="loading" v-show="hasMore">
          <img class="img" src="../../assets/images/loading.gif">
          <p class="desc">加载更多</p>
        </div>
        <!--endregion-->
      </ul>
      <!--region 热门搜索词汇-->
      <div class="hot-key-list" v-show="!queryVal">
        <h1>热门搜索</h1>
        <ul>
          <template v-for="(key,index) in hotKeyList">
            <li :class="selectHotKey ===key.n ?'item active':'item'" v-if="index<10" @click="hotKeySelect(key)">{{key.k}}</li>
          </template>
        </ul>
      </div>
      <!--endregion-->
      <!--region 搜索历史-->
      <div class="search-history" v-show="!queryVal">
        <h1><span class="text">搜索历史</span><span class="axon-icon" v-html="'&#xe616;'" @click="emptyHistory()"></span>
        </h1>
        <ul>
          <template v-for="(item, index) in historyList">
            <li><span class="text" @click="historySelect(item)">{{item}}</span>
              <span class="axon-icon" v-html="'&#xe603;'" @click="delHistoryItem(item)">
              </span>
            </li>
          </template>
        </ul>
      </div>
      <!--endregion-->
      <!--region 没有数据提示-->
      <div class="no-data" v-show="!hasMore && !dataList.length">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
      <!--endregion-->
    </i-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
  import BLL from './Index'
  import SearchBox from '../../components/business/iSearchBox.vue'
  import IScroll from '../../components/better-scroll/iScroll.vue'
  import NoResult from '../../components/business/iNoResult.vue'

  import { mapState } from 'vuex'

  export default {
    components: {SearchBox, IScroll, NoResult},
    data () {
      return {
        queryVal: '',
        page: 1, // 页码
        pullup: true,
        dataList: [],
        listenScroll: true,
        topMargin: 148,
        hasMore: true,
        beforeScroll: true,
        hotKeyList: [], // 热门搜索词汇
        selectHotKey: '' // 当前选中的热门搜索词汇
      }
    },
    created () {
      this.BLL = new BLL(this)
    },
    computed: {
      ...mapState({
        historyList: ({searchInfo}) => searchInfo.history
      })
    },
    mounted () {
      this.getHotKeys()
    },
    methods: {
      // 处理用户输入的值
      query (val) {
        this.queryVal = val
        this.search()
      },
      // 搜索
      search () {
        this.BLL.search()
      },
      // 下拉加载更多
      searchMore () {
        this.BLL.searchMore()
      },
      listScroll () {},
      // 热门搜索词汇
      getHotKeys () {
        this.BLL.getHotKey()
      },
      // 选中热门词汇
      hotKeySelect (item) {
        this.selectHotKey = item.n
        this.queryVal = item.k
        this.BLL.search()
      },
      // 点击历史记录
      historySelect (item) {
        this.queryVal = item
      },
      // 删除某一条历史记录
      delHistoryItem (item) {
        this.$store.commit('del_history_item', item)
      },
      // 清空历史记录
      emptyHistory () {
        console.log('123:', 123)
        this.$store.commit('empty_history')
      },
      // 栏目点击
      selectItem (item) {
        this.BLL.selectItem(item)
      }
    }
  }
</script>

<style lang="scss">
  @import "./Index";
</style>
