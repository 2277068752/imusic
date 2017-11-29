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
// import './plugs/loading/loading.scss'
import LoadingPlugin from './plugs/loading'

Vue.config.productionTip = false

Vue.use(VuelazyLoad, {
  loading: require('./assets/images/default.png')
})
Vue.use(Utils)
Vue.use(HttpPlugin)
Vue.use(LoadingPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
