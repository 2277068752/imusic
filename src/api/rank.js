import Vue from 'vue'
import Exception from './exceptions'

export default {
  /**
   * 推荐列表
   * @returns {Promise}
   */
  getRankList () {
    return new Promise((resolve) => {
      const url = 'music/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=h5&uin=0&needNewCode=1&jsonCallback=__jp0'
      Vue.$api.xHttp.get(url).then(res => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  }
}
