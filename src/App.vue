<template>
  <div id="app" style="height:100%;" v-cloak>
    <!--region 头部-->
    <i-header></i-header>
    <!--endregion-->
    <!--region 选择性的使用keep-alive-->
    <router-view class="page-view">
    </router-view>
    <!--endregion-->
  </div>
</template>

<script>
  import iHeader from './components/iHeader.vue'

  export default {
    components: {iHeader},
    data () {
      return {}
    },
    mounted () {}
  }
</script>

<style lang="scss">
  @import "./assets/styles/global/_common.scss";
  @import "./assets/styles/global/_cover.scss";
  @import "./assets/styles/global/_fonts.scss";
  // 防止未编译好的内容流出
  [v-cloak] {
    display: none;
  }
</style>
