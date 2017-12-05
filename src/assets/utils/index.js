import Common from './common.js'
import LocalStorage from './localStorage'

export const utils = {Common, LocalStorage}

export default {
  install (Vue) {
    Vue.prototype.$utils = utils
    Vue.$utils = utils
  },
  $utils: utils
}
