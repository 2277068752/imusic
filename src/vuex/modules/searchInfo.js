const state = {
  history: [] // 搜索历史
}
const getters = {
  history: state => {
    return state.history
  }
}

const mutations = {
  // 保存当前的一条历史记录
  set_history (state, val) {
    if (state.history.indexOf(val) < 0) {
      state.history.unshift(val)
    }
  },
  // 删除选中的一条历史记录
  del_history_item (state, val) {
    let index = state.history.indexOf(val)
    if (index > -1) {
      state.history.splice(index, 1)
    }
  },
  // 清空历史记录
  empty_history (state) {
    state.history = []
  }
}
export default {
  state,
  getters,
  mutations
}
