import Common from './common.js'

export const utils = {Common}

export default {
  install (Vue) {
    Vue.prototype.$utils = utils
    Vue.$utils = utils
  },
  $utils: utils
}
