import Vue from 'vue'
import Exception from './exceptions'

export default {
  /**
   * 歌手列表
   * @returns {Promise}
   */
  getSingerList () {
    return new Promise((resolve) => {
      const url = 'music/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonCallback=__jp0'
      Vue.$api.xHttp.get(url).then(res => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 根据歌手的id 取该歌手的歌曲列表
   * @param singerId
   */
  getSongListBySingerId (singerId) {
    console.log('singerId:', singerId)
    return new Promise((resolve) => {
      let url = `music/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=150&songstatus=1&singermid=${singerId}&jsonCallback=__jp3`
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  }
}
