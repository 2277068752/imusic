<template>
  <div class="search-box-comp">
    <span class="axon-icon" v-html="'&#xe600;'"></span>
    <input ref="query" type="text" class="box" v-model="query" :placeholder="placeholder"/>
    <span class="axon-icon" v-html="'&#xe614;'" @click="clear" v-show="query"></span>
  </div>
</template>
<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入搜索条件'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        query: ''
      }
    },
    mounted () {
      if (this.value.length > 0) {
        this.query = this.value
      }
    },
    watch: {
      value (val) {
        if (this.value) {
          this.query = val
        }
      },
      query (val) {
        let timer
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.$emit('query', val)
        }, 200)
      }
    },
    methods: {
      // 清除筛选条件
      clear () {
        this.query = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global/_fonts";

  .search-box-comp {
    background-color: #333;
    display: flex;
    box-sizing: border-box;
    padding: 0 12px;
    border-radius: 6px;
    -moz-box-align: center;
    height: 80px;
    width: 100%;
    span.axon-icon {
      color: #222;
      font-size: 40px;
      line-height: 80px;
    }
    .box {
      flex: 1;
      margin: 0 5px;
      line-height: 36px;
      background: #333;
      color: #fff;
      font-size: 14px;
      outline: hidden;
      border-width: 0;
      font-size: $font-size-l;
      &:focus, &:hover {
        outline: hidden;
        border-width: 0;
      }
    }
  }
</style>
