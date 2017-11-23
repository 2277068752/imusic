import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/Recommend/Recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '推荐',
      component: Recommend
    },
    {
      path: '/recommend',
      name: '推荐',
      component: Recommend
    }
  ]
})
