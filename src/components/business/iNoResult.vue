<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global/_fonts";

  .no-result {
    text-align: center;
    .no-result-icon {
      width: 172px;
      height: 180px;
      margin: 0 auto;
      background-image: url("../../assets/images/no-result@3x.png");
      background-size: 172px 180px;
    }
    .no-result-text {
      margin-top: 30px;
      font-size: $font-size-xl;
      color: rgba(255, 255, 255, 0.3)
    }
  }
</style>
