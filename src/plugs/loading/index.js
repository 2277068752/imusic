let Loading = {}
let showLoad = false, // 存储loading显示状态
  loadNode = null // 存储loading节点元素
Loading.install = function (Vue, options) {
  Vue.prototype.$loading = function (tips, type) {
    if (type === 'hide') {
      loadNode.show = showLoad = false
    } else {
      if (showLoad) {
        // 如果loading还在，则不再执行
        return
      }
      let loadTpl = Vue.extend({
        data: function () {
          return {
            show: showLoad
          }
        },
        template: `<div class="loading-comp" v-show="show"><span class="circles-loader"></span><p class="desc">${tips}</p></div>`
      })
      loadNode = new loadTpl()
      let tpl = loadNode.$mount().$el

      document.body.appendChild(tpl)
      loadNode.show = showLoad = true
    }
  };

  ['show', 'hide'].forEach(function (type) {
    Vue.prototype.$loading[type] = function (tips) {
      return Vue.prototype.$loading(tips, type)
    }
  })
}

module.exports = Loading
