import Base from '../../Base'
import { Exception, Recommend } from '../../api'

export default class extends Base {
  /**
   * 推荐列表业务逻辑
   */
  getRecommendList () {
    this.vm.$loading.show('正在努力加载中')
    Recommend.getRecommendList().then(res => {
      if (res.code === Exception.CODE.SUCCESS) {
        let data = res.data
        this.vm.bannerData = data.slider
        this.vm.$loading.hide()
      }
    })
  }

  getSescList () {
    Recommend.getDescList().then(res => {
      if (res.code === Exception.CODE.SUCCESS) {
      }
    })
  }
}
