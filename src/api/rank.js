import Vue from 'vue'
import Exception from './exceptions'

export default {
  /**
   * 取排行列表
   * @returns {Promise}
   */
  getRankList () {
    return new Promise((resolve) => {
      const url = 'music/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=h5&needNewCode=1&jsonCallback=__jp1'
      Vue.$api.xHttp.get(url).then(res => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  }
}
