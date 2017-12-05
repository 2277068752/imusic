import Base from '../../Base'
import { Exception, Rank } from '../../api'

export default class extends Base {
  getRankList () {
    Rank.getRankList().then((res) => {
      if (res.code === Exception.CODE.SUCCESS) {
        let data = res.data
        this.vm.rankListData = data.topList
      }
    })
  }
}
