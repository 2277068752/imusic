<template>
  <div id="app" style="height:100%;" v-cloak>
    <!--region 选择性的使用keep-alive-->
    <!--endregion-->
    <router-view class="page-view">
    </router-view>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" >
  @import "./assets/styles/global/_common.scss";
  @import "./assets/styles/global/_cover.scss";
  @import "./assets/styles/global/_fonts.scss";
  // 防止未编译好的内容流出
  [v-cloak] {
    display: none;
  }
</style>
