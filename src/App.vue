<template>
  <div id="app" style="height:100%;" v-cloak>
    <!--region 头部-->
    <i-header></i-header>
    <!--endregion-->
    <!--region tab-->
    <i-tab></i-tab>
    <!--endregion-->
    <!--region 选择性的使用keep-alive-->
    <keep-alive>
      <router-view class="page-view">
      </router-view>
    </keep-alive>
    <!--endregion-->
  </div>
</template>

<script>
  import iHeader from './components/iHeader.vue'
  import iTab from './components/iTab.vue'

  export default {
    components: {iHeader, iTab},
    data () {
      return {}
    },
    mounted () {}
  }
</script>

<style lang="scss">
  @import "./assets/styles/global/_variable.scss";
  @import "./assets/styles/global/_fonts.scss";
  @import "./assets/styles/global/_common.scss";
  @import "./assets/styles/global/_cover.scss";
  @import "assets/styles/global/iconfonts";
  // 防止未编译好的内容流出
  [v-cloak] {
    display: none;
  }
</style>
