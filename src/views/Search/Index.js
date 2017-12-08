import Base from '../../Base'
import { Exception, Search } from '../../api'
import { createSong } from '../../model/song'
import Singers from '../../model/singer'

export default class extends Base {
  /**
   * 根据查询条件搜索数据
   */
  getSearchList () {
    this.vm.$loading.show('火速搜索中')
    let param = {
      query: this.vm.queryVal,
      page: this.vm.page,
      zhida: 1,
      perpage: 30
    }
    Search.searchSingerOrSong(param).then((res) => {
      this.vm.$loading.hide()
      if (res.code === Exception.CODE.SUCCESS) {
        let data = res.data
        this.vm.dataList = this.vm.dataList.concat(this.getResult(data))
        this.checkMore(data)
      }
    })
  }

  /**
   * 组织歌曲列表
   */
  getResult (data) {
    let ret = []
    // 歌手
    if (data.zhida && data.zhida.singerid) {
      ret.push({
        ...data.zhida,
        ...{type: 'singer'}
      })
    }
    // 歌曲
    if (data.song) {
      ret = ret.concat(this.normalizeSongs(data.song.list))
    }
    return ret
  }

  normalizeSongs (list) {
    let ret = []
    list.forEach((musicData) => {
      if (musicData.songid && musicData.albumid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }

  /**
   * 搜索数据
   */
  search () {
    this.vm.page = 1
    this.vm.$refs.dataList.scrollTo(0, 0)
    this.vm.dataList = []
    this.vm.hasMore = true
    if (this.vm.queryVal.length > 0) {
      // 保存搜索记录
      this.saveSearchHistory()
      this.getSearchList()
    }
  }

  /**
   * 保存搜索记录
   * @param val
   */
  saveSearchHistory () {
    if (this.vm.queryVal) {
      this.vm.$store.commit('set_history', this.vm.queryVal)
    }
  }

  /**
   * 下拉加载更多
   */
  searchMore () {
    if (this.vm.queryVal.length > 0) {
      if (!this.vm.hasMore) {
        return
      }
      this.vm.page++
      this.getSearchList()
    } else {
      this.vm.hasMore = true
      this.vm.dataList = []
    }
  }

  /**
   * 判断是否还需要下拉加载
   * @param data
   */
  checkMore (data) {
    const song = data.song
    if (!song.list.length || (song.curnum + song.curpage * this.vm.perpage) >= song.totalnum) {
      this.vm.hasMore = false
    }
  }

  /**
   * 取热门搜索字段
   */
  getHotKey () {
    this.vm.$loading.show('加载中')
    Search.getHotKey().then((res) => {
      if (res.code === Exception.CODE.SUCCESS) {
        this.vm.hotKeyList = res.data.hotkey.slice(0, 10)
        this.vm.$loading.hide()
      }
    })
  }

  /**
   * 歌曲/歌手点击
   * @param model
   */
  selectItem (model) {
    let singer = new Singers({
      id: model.singermid,
      name: model.singername
    })
    // 判断是否为歌手，如果为歌手，则跳转到歌手页面
    if (model.type && model.type === 'singer') {
      // 持久化歌手信息
      this.vm.$store.commit('set_singerInfo', singer)
      this.vm.$router.push({path: `/search/${singer.id}`})
    }
  }
}
