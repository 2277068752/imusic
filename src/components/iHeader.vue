<template>
  <div class="header-comp">
      <span class="icon">
      </span>
    <h2>Chicken Music</h2>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {}
    },
    mounted () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global/_variable";

  .header-comp {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 88px;
    text-align: center;
    .icon {
      width: 64px;
      height: 64px;
      background-image: url("../assets/images/default.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: inline-block;
      vertical-align: top;
      margin-top: 4px;
    }
    h2 {
      color: $main-font-color;
      text-align: center;
      line-height: 88px;
      display: inline-block;
    }
  }
</style>
