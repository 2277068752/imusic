import Vue from 'vue'
import Exception from './exceptions'

export default {
  /**
   * 搜索歌曲或者歌手
   */
  searchSingerOrSong (param) {
    return new Promise((resolve) => {
      let url = `music/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${param.query}&p=${param.page}&catZhida=${param.zhida}&perpage=${param.perpage}0&n=${param.perpage}0&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5&jsonCallback=__jp9`
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 取热门搜索词汇
   */
  getHotKey () {
    return new Promise((resolve) => {
      let url = `music/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=h5&needNewCode=1&jsonCallback=__jp0`
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  }
}
