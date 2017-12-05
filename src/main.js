import Vue from 'vue'
import App from './App'
import 'lib-flexible'
import FastClick from 'fastclick'
// vue-router
import { sync } from 'vuex-router-sync'
import routers from './router'
import VueRouter from 'vue-router'

// vuex
import store from './vuex/store'

// Plugin
import UtilsPlugin from './assets/utils/index'
import HttpPlugin from './http'
import LoadingPlugin from './plugs/loading'
import ToastPlugin from './plugs/toast'

// img lazy
import VuelazyLoad from 'vue-lazyload'
import config from '../config/index'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueRouter)
const router = new VueRouter({
  mode: '', // process.env.NODE_ENV === 'production' ? 'history' : '', // history模式
  base: config.build.assetsPublicPath,
  routes: routers.routes
})
Vue.use(VuelazyLoad, {
  loading: require('./assets/images/default.png')
})

const commit = store.commit

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/* vue-router相关配置
 * to：Route 即将要进入的目标 路由对象
 * from：Route 当前导航正要离开的路由
 * next：Function 一定要调用该方法resolve这个钩子，执行效果依赖next方法的调用参数
 */
router.beforeEach((to, from, next) => {
  commit('set_curr_path', to.path)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    // 前进动画
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      commit('set_direction', 'forward')
    } else {
      commit('set_direction', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('set_direction', 'forward')
  }
  next()
  // setTimeout(next(), 0)
})
// 注册一个全局的after的钩子，不会改变导航
router.afterEach((to) => {
})

sync(store, router)

Vue.use(UtilsPlugin)
Vue.use(HttpPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

/* eslint-disable no-new */
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root')
