import Base from '../../Base'
import { Exception, Rank } from '../../api'

export default class extends Base {
  getRankList () {
    this.vm.$loading.show('排行获取中')
    Rank.getRankList().then((res) => {
      if (res.code === Exception.CODE.SUCCESS) {
        let data = res.data
        this.vm.rankListData = data.topList
      }
      this.vm.$loading.hide()
    })
  }
}
