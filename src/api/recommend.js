import Vue from 'vue'
import Exception from './exceptions'

export default {
  /**
   * 推荐列表
   * @returns {Promise}
   */
  getRecommendList () {
    return new Promise((resolve) => {
      const url = 'music/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=h5&uin=0&needNewCode=1&jsonCallback=__jp0'
      Vue.$api.xHttp.get(url).then(res => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 取推荐歌曲列表
   * @returns {Promise}
   */
  getDescList () {
    return new Promise((resolve) => {
      const url = 'music/api/getDiscList?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.21098870586786633#/'
      Vue.$api.xHttp.get(url).then(res => {
        resolve(res)
      }).catch((ex) => {
        Exception.ErrorMsgNotification(-1)
      })
    })
  }
}
