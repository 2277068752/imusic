import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/Recommend/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '默认',
      component: Recommend
    },
    {
      path: '/recommend',
      name: '推荐',
      component: Recommend
    }
  ]
})
