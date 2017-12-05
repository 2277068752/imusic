import Vuex from 'vuex'
import localStorage from '../assets/utils/localStorage'
import config from '../../config'
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import searchInfo from './modules/searchInfo'
import global from './modules/global'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    searchInfo,
    global
  },
  // 插件
  plugins: [createPersistedState({
    key: config.build.assetsPublicPath + 'vuex',
    paths: ['searchInfo'],
    getState: (key) => localStorage.get(key),
    setState: (key, state) => localStorage.set(key, state)
  })]
})
