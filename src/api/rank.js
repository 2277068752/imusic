import Vue from 'vue'

export default {
  getDiscList () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('music/getDiscList')
    })
  }
}
