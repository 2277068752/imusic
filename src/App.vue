<template>
  <div id="app" style="height:100%;" v-cloak>
    <!--region 头部-->
    <i-header></i-header>
    <!--endregion-->
    <!--region tab-->
    <i-tab></i-tab>
    <!--endregion-->
    <!--region 选择性的使用keep-alive-->
    <div class="page-wrap">
      <transition :name="transitionName" mode="out-in" @before-enter="beforeEnter" @after-enter="afterEnter">
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import iHeader from './components/iHeader.vue'
  import iTab from './components/iTab.vue'
  import { mapState } from 'vuex'

  export default {
    components: {iHeader, iTab},
    data () {
      return {
        transition: 'go'
      }
    },
    created () {
      // 移动端调试 console
      // more info https://github.com/liriliri/eruda
      if (this.$utils.Common.getParam('debug')) {
        const script = document.createElement('script')
        script.src = 'https://cdn.bootcss.com/eruda/1.2.3/eruda.js'
        document.body.appendChild(script)
        script.onload = function () { window.eruda.init({tool: ['console', 'network', 'sources']}) }
      }
    },
    mounted () {},
    computed: {
      ...mapState({
        direction: ({global}) => global.direction
      }),
      transitionName () {
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
    methods: {
      beforeEnter () {},
      afterEnter () {}
    }
  }
</script>

<style lang="scss">
  @import "./assets/styles/global/_variable";
  @import "./assets/styles/global/_fonts";
  @import "./assets/styles/global/_common";
  @import "./assets/styles/global/_cover";
  @import "./assets/styles/global/_mixins";
  @import "./assets/styles/global/iconfonts";
  @import "./assets/styles/global/_vueg";
  // 防止未编译好的内容流出
  [v-cloak] {
    display: none;
  }

  .page-wrap {
    @include page-top-margin;
    .router-view {
      overflow-y: hidden;
      height: 100%;
    }
  }
</style>
