<template>
  <div v-show="isShow" id="toast" ref="toast" class="toast-comp animated">
    <div class="text" ref="text">
      <span>{{text}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      show: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isShow: false
      }
    },
    computed: {},
    watch: {
      text (val) {
        if (val.length > 0) {
          // 计算文字的宽度 文本长度 * 文本字体大小（14px）
          const padding = 12 // padding
          const fontSize = 14 // 字体大小
          const pageWidth = this.$utils.Common.getWidthHeight().width // 页面宽度
          let textWidth = val.length * fontSize
          let $divHtml = this.$refs.toast.style
          $divHtml.width = (textWidth + padding * 2) + 'px'
          $divHtml.paddingLeft = $divHtml.paddingRight = padding + 'px'
          // 判断当前的文本长度 是否 超过最大宽度
          if ((textWidth + padding * 2) > pageWidth * 0.8) {
            $divHtml.left = 10 + '%'
          } else {
            $divHtml.left = (pageWidth - (textWidth + padding * 2)) / 2 + 'px'
          }
        }
      },
      show (val) {
        if (val) {
          this.$utils.Common.removeClass(this.$refs.toast, 'fade-out')
          this.$utils.Common.addClass(this.$refs.toast, 'fade-in')
          this.isShow = true
        } else {
          clearTimeout(this.timeOut)
          // let _this = this
          this.$utils.Common.removeClass(this.$refs.toast, 'fade-in')
          this.$utils.Common.addClass(this.$refs.toast, 'fade-out')
          this.timeOut = setTimeout(function () {
            // _this.isShow = false
          }, 500)
        }
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global/_fonts";

  .toast-comp {
    background-color: #fff;
    height: 36PX;
    line-height: 36PX;
    position: absolute;
    top: 80%;
    border-radius: 14px;
    z-index: 11000;
    max-width: 80%;
    overflow: hidden;
    .text {
      width: 100%;
      text-align: center;
      font-size: $font-size-l;
      overflow: hidden;
      word-break: break-all;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }
    &.fade-in {
      animation-name: fadeIn;
    }
    &.fade-out {
      animation-name: fadeOut;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
</style>
