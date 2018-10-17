import {
  getCategoryImgList,
  getImgs
} from '@/api';
const state = {
  imgList: [],
  Page: 1,
  isFetching: false,
  imgs: [],
  flag: false
}

const mutations = {
  /**
   *  做数据处理
   * @param {*} state
   * @param {*} payload
   */
  updateImgList(state, payload) {
    if (state.flag) {
      state.imgList = state.imgList.concat(payload.List);
    } else {
      state.imgList = payload.List;
    }
    state.Page++;
    state.isFetching = false;
  },
  startFetching(state) {
    state.isFetching = true;
  },
  updateImgs(state, payload) {
    state.imgs = payload;
  }
}

const actions = {
  getCategoryImgList({
    commit,
    state
  }, payload) {
    payload.Page = state.Page;
    state.flag = payload.flag;
    if (state.isFetching) {
      return;
    }
    commit('startFetching');
    getCategoryImgList(payload).then(res => {
      commit('updateImgList', res.data);
    })
  },
  getImgs({
    commit
  }, payload) {
    // console.log(payload)
    getImgs(payload).then(res => {
      commit('updateImgs', res.data);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
