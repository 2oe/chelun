import {
  getColorList
} from '@/api';
const state = {
  colorList: {}
}

const mutations = {
  updateColorList(state, payload) {
    state.colorList = payload;
  }
}

const actions = {
  getColorList({
    commit
  }, payload) {
    getColorList(payload).then(res => {
      commit('updateColorList', res.data);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
