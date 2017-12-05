// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible'
import router from './router'
import Utils from './assets/utils/index'
import HttpPlugin from './http'
import VuelazyLoad from 'vue-lazyload'
// loading
import LoadingPlugin from './plugs/loading'
// toast
import ToastPlugin from './plugs/toast'
// vuex
import store from './vuex/store'

Vue.config.productionTip = false

Vue.use(VuelazyLoad, {
  loading: require('./assets/images/default.png')
})
Vue.use(Utils)
Vue.use(HttpPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

// const commit = store.commit

/* eslint-disable no-new */
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root')
