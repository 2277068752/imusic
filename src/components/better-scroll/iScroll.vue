<template>
  <div ref="pageWrapper" :class="topMargin>0?'wrapper page-top-margin':'wrapper'" :style="{height:pageHeight}">
    <!--<div class="content">-->
      <slot></slot>
      <slot name="loading"></slot>
    <!--</div>-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      topMargin: {
        type: Number,
        default: 88
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 200)
    },
    computed: {
      pageHeight () {
        let pageHeight = this.$utils.Common.getWidthHeight().height - this.topMargin + 'px'
        return pageHeight
      }
    },
    methods: {
      _initScroll () {
        if (!this.$refs.pageWrapper) {
          return
        }

        this.scroll = new BScroll(this.$refs.pageWrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this

          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/styles/global/_fonts";

  .page-top-margin {
    flex-direction: column;
    &.wrapper {
      width: 100%;
      overflow: hidden;
      .content {
        width: 100%;
      }
    }
    .loading {
      display: inline-block;
      width: 100%;
      text-align: center;
      .img {
        width: 25PX;
        height: 25PX;
      }
      .desc {
        margin-top: 6PX;
        font-size: $font-size-m;
        color: rgba(255, 255, 255, 0.3)
      }
    }
  }
</style>
