<template>
  <div class="loading">
    <img class="img" src="../assets/images/loading.gif">
    <p class="desc">{{ title }}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在加载...'
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/styles/global/_fonts";

  .loading {
    position: relative;
    width: 100%;
    text-align: center;
    .img {
      width: 25PX;
      height: 25PX;
    }
    .desc {
      margin-top: 30PX;
      line-height: 20PX;
      font-size: $font-size-xl;
      color: rgba(255, 255, 255, 0.3)
    }
  }
</style>

