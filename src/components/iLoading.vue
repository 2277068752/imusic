<template>
  <div v-show="show" class="loading-comp">
    <div class="loading">
      <span class="circles-loader">Loading&#8230;</span>
      <p class="desc">{{ text }}</p>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      show: {
        type: Boolean,
        defaule: false
      },
      text: {
        type: String,
        default: '正在加载……'
      }
    },
    data () {
      return {}
    },
    mounted () {},
    methods: {}
  }
</script>

<style lang="scss">
  @import "../assets/styles/global/_variable";
  @import "../assets/styles/global/_fonts";

  .loading-comp {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    background-color: rgba(255, 255, 255, 0);
    transform: translateY(-50%);
    .loading {
      position: relative;
      width: 100%;
      top: 50%;
      text-align: center;
      .desc {
        margin-top: 30PX;
        line-height: 20PX;
        font-size: $font-size-m;
        color: $main-font-color;
      }
    }

    @-moz-keyframes circles-loader {
      0% {
        -moz-transform: rotate(-720deg);
        transform: rotate(-720deg);
      }
      50% {
        -moz-transform: rotate(720deg);
        transform: rotate(720deg);
      }
    }
    @-webkit-keyframes circles-loader {
      0% {
        -webkit-transform: rotate(-720deg);
        transform: rotate(-720deg);
      }
      50% {
        -webkit-transform: rotate(720deg);
        transform: rotate(720deg);
      }
    }
    @keyframes circles-loader {
      0% {
        -moz-transform: rotate(-720deg);
        -ms-transform: rotate(-720deg);
        -webkit-transform: rotate(-720deg);
        transform: rotate(-720deg);
      }
      50% {
        -moz-transform: rotate(720deg);
        -ms-transform: rotate(720deg);
        -webkit-transform: rotate(720deg);
        transform: rotate(720deg);
      }
    }
    /* :not(:required) hides this rule from IE9 and below */
    .circles-loader:not(:required) {
      position: relative;
      text-indent: -9999PX;
      display: inline-block;
      width: 25PX;
      height: 25PX;
      background: rgba(255, 204, 51, 0.9);
      border-radius: 100%;
      -moz-animation: circles-loader 3s infinite ease-in-out;
      -webkit-animation: circles-loader 3s infinite ease-in-out;
      animation: circles-loader 3s infinite ease-in-out;
      -moz-transform-origin: 50% 100%;
      -ms-transform-origin: 50% 100%;
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
    }
    .circles-loader:not(:required)::before {
      background: rgba(255, 102, 0, 0.6);
      border-radius: 100%;
      content: '';
      position: absolute;
      width: 25PX;
      height: 25PX;
      top: 18.75PX;
      left: -10.82532PX;
    }
    .circles-loader:not(:required)::after {
      background: rgba(255, 51, 0, 0.4);
      border-radius: 100%;
      content: '';
      position: absolute;
      width: 25PX;
      height: 25PX;
      top: 18.75PX;
      left: 10.82532PX;
    }
  }
</style>
