import SingerDetail from '@/views/Singers/Detail/Index.vue'

export default {
  defaultTitle: 'iMusic',
  routes: [
    {
      path: '/',
      name: '默认',
      component: function (resolve) {
        require(['@/views/Recommend/Index.vue'], resolve)
      }
    },
    {
      path: '/recommend',
      name: '推荐',
      component: function (resolve) {
        require(['@/views/Recommend/Index.vue'], resolve)
      }
    },
    {
      path: '/singer',
      name: '歌手',
      component: function (resolve) {
        require(['@/views/Singers/Index.vue'], resolve)
      },
      children: [
        {
          path: ':id',
          name: '歌手详情',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: '排行',
      component: function (resolve) {
        require(['@/views/RankList/Index.vue'], resolve)
      }
    },
    {
      path: '/search',
      name: '搜索',
      component: function (resolve) {
        require(['@/views/Search/Index.vue'], resolve)
      },
      children: [
        {
          path: ':id',
          name: '歌手详情',
          component: SingerDetail
        }
      ]
    }
  ]
}
