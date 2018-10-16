import {
  getDealerList,
  getCityList,
  getProCity
} from '@/api';
const state = {
  // 初始化数据
  dealer: {},
  cityList: [],
  proCity: []
}

const mutations = {
  updateDealerList(state, payload) {
    state.dealer = payload;
  },
  updategetCityList(state, payload) {
    state.cityList = payload;
  },
  updategetProCity(state, payload) {
    state.proCity = payload;
  }
}

const actions = {
  dealerList({
    commit
  }, payload) {
    getDealerList(payload).then(res => {
      commit('updateDealerList', res.data);
    })
  },
  getCityList({
    commit
  }) {
    getCityList().then(res => {
      commit('updategetCityList', res.data);
    })
  },
  getProCity({
    commit
  }, payload) {
    getProCity(payload).then(res => {
      commit('updategetProCity', res.data);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
