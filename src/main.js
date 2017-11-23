// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Utils from './assets/utils/index'
import HttpPlugin from './http'

Vue.config.productionTip = false

Vue.use(Utils)
Vue.use(HttpPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
