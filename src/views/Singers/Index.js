import Base from '../../Base'
import { Exception, Singer } from '../../api'
import Singers from '../../model/singer'
import { createSong } from '../../model/song'

export default class extends Base {
  /**
   * 取歌手列表信息
   */
  getSingerList () {
    this.vm.$loading.show('你的偶像马上就出来')
    Singer.getSingerList().then((res) => {
      if (res.code === Exception.CODE.SUCCESS) {
        let data = res.data
        this.vm.$loading.hide()
        this.vm.singerList = this.normalizeSinger(data.list)
      }
    })
  }

  /**
   * 歌手排序
   * @param list 待处理歌手列表
   */
  normalizeSinger (list) {
    let map = {
      hot: {
        title: this.vm.HOT_NAME,
        items: []
      }
    }
    list.forEach((_x, index) => {
      if (index < this.vm.HOT_SINGER_LEN) {
        map.hot.items.push(new Singers({
          id: _x.Fsinger_mid,
          name: _x.Fsinger_name
        }))
      }
      const key = _x.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singers({
        id: _x.Fsinger_mid,
        name: _x.Fsinger_name
      }))
    })
    // 为了得到有序列表，我们需要处理map
    let hot = []
    let ret = []
    for (let key in map) {
      let val = map[key]
      // 判断是否为热门歌手
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val) // 不是热门歌手，添加到普通列表中
      } else if (val.title === this.vm.HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  }

  /**
   *  根据歌手的id 取该歌手的歌曲列表
   */
  getSongListBySingerId () {
    this.vm.$loading.show('精彩歌曲马上来')
    Singer.getSongListBySingerId(this.vm.singerInfo.id).then((res) => {
      if (res.code === Exception.CODE.SUCCESS) {
        this.vm.$loading.hide()
        this.vm.songListData = this.normalizeSongs(res.data.list)
      }
    })
  }

  /**
   * 整理歌曲列表格式
   * @param list
   * @returns {Array}
   */
  normalizeSongs (list) {
    let ret = [] // 最终需要的返回值
    list.forEach((item) => {
      let {musicData} = item
      if (musicData.songid && musicData.albumid) {
        ret.push(createSong(musicData))
      }
    })

    return ret
  }

  goSingerDetail (singer) {
    // 持久化歌手信息
    this.vm.$store.commit('set_singerInfo', singer)
    this.vm.$router.push({path: `/singer/${singer.id}`})
  }
}
