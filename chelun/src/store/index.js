import Vue from 'vue'
import Vuex from 'vuex'
// 引入module
import index from './module/index'
import detail from './module/detail'
import dealer from './module/dealer'
import img from './module/img'
import color from './module/color'
// 记录mutation,相当于redux-logger的作用
import Logger from 'vuex/dist/logger'

Vue.use(Vuex)

// 生成一个vuex实例
export default new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    changeLoading(state, payload) {
      state.loading = payload;
    }
  },
  modules: {
    index,
    detail,
    dealer,
    img,
    color
  },
  plugins: [Logger()]
})
