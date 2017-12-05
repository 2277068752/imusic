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
  }
}
