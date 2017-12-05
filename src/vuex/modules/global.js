const state = {
  direction: 'forward',
  currPath: '/'
}
const getters = {}
const mutations = {
  set_direction (state, direction) {
    state.direction = direction
  },
  set_curr_path (state, path) {
    state.currPath = path
  }
}
export default {
  state,
  mutations,
  getters
}
