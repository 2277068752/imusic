import Base from '../../Base'
import { Exception, Search } from '../../api'

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
        this.checkMore(data)
        if (this.vm.page > 1) {
          this.vm.dataList = this.vm.dataList.concat(data.song.list)
        } else {
          this.vm.dataList = data.song.list
        }
      }
    })
  }

  /**
   * 搜索数据
   */
  search () {
    this.vm.page = 1
    this.vm.$refs.dataList.scrollTo(0, 0)
    if (this.vm.queryVal.length > 0) {
      // 保存搜索记录
      this.saveSearchHistory()
      this.vm.hasMore = true
      this.getSearchList()
    } else {
      this.vm.hasMore = true
      this.vm.dataList = []
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
    Search.getHotKey().then((res) => {
      if (res.code === Exception.CODE.SUCCESS) {
        this.vm.hotKeyList = res.data.hotkey.slice(0, 10)
      }
    })
  }
}
