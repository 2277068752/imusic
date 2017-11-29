import Base from '../../Base'
import { Exception, Rank } from '../../api'

export default class extends Base {
  /**
   * 推荐列表业务逻辑
   */
  getRankList () {
    Rank.getRankList().then(res => {
      if (res.code === Exception.CODE.SUCCESS) {
        let data = res.data
        this.vm.bannerData = data.slider
      }
    })
  }

  getSescList () {
    Rank.getDescList().then(res => {
      if (res.code === Exception.CODE.SUCCESS) {
      }
    })
  }
}
