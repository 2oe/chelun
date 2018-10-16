import {
  getBrandList,
  getMakeList
} from "@/api";
const state = {
  list: [],
  makeList: []
}
// 同步改变
const mutations = {
  updateList(state, payload) {
    var obj = {};
    payload.forEach(function (item) {
      var key = item.Spelling.substr(0, 1).toUpperCase();
      if (!obj[key]) {
        obj[key] = {
          title: key,
          list: []
        }
      }
      obj[key].list.push(item);
    })
    var arr = [];
    for (var k in obj) {
      arr.push(obj[k]);
    }
    arr.sort(function (x, y) {
      return x.title.charCodeAt(0) - y.title.charCodeAt(0);
    })
    state.list = arr
  },
  updatemakeList(state, payload) {
    state.makeList = payload
  }
}
// 异步改变
const actions = {
  BrandList({
    commit
  }) {
    getBrandList().then(res => {
      commit('updateList', res.data)
    })
  },
  MakeList({
    commit
  }, id) {
    getMakeList(id).then(res => {
      commit('updatemakeList', res.data)
    })
  }
}
export default {
  // 命名空间
  namespaced: true,
  state,
  actions,
  mutations
}
