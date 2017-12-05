import ToastComponent from '../../components/iToast.vue'

let $vm
export default {
  install (Vue, options) {
    if (!$vm) {
      const ToastPlugin = Vue.extend(ToastComponent)
      $vm = new ToastPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    $vm.show = false
    let toast = {
      show (text) {
        $vm.show = true
        $vm.text = text
        this.timeOut = setTimeout(function () {
          $vm.show = false
          clearTimeout(this.timeOut)
        }, 3000)
      }
    }
    if (!Vue.$toast) {
      Vue.$toast = toast
    }
    Vue.mixin({
      created () {
        this.$toast = Vue.$toast
      }
    })
  }
}
