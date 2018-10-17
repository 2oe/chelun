import {
  getInfoAndListById,
  getCityInfo
} from '@/api';
import {
  mergeCar,
  sortCar,
  filter
} from '@/utils';
const state = {
  // 初始化数据
  infoAndListById: [],
  tabs: [],
  tabList: {},
  tabConAll: {},
  cityInfo: {}
}

const mutations = {
  /**
   *  做数据处理
   *  排序规则: 排量的升序=>发动机功率升序=>吸气方式（自然吸气>涡轮增压）=>年份降序
   * @param {*} state
   * @param {*} payload
   */
  updateCarList(state, payload) {
    let tabsCon = ['全部']
    // 遍历数据得到切换的数据
    payload.list.forEach(item => {
      let key = item.market_attribute.year;
      if (tabsCon.indexOf(key) == -1) {
        tabsCon.push(key)
      }
    })
    // 名字
    state.tabs = tabsCon
    state.infoAndListById = payload;
    // 全部的数据
    state.tabConAll = mergeCar(sortCar(payload.list))
    // console.log('payload...', payload.list, sortCar(payload.list),
    //   mergeCar(sortCar(payload.list)),
    //   mergeCar(sortCar(filter(2018, payload.list))));
  },
  updateYearList(state, payload) {
    // 点击时切换的数据
    state.tabList = mergeCar(sortCar(filter(payload, state.infoAndListById.list)))
  },
  updateCityInfo(state, payload) {
    state.cityInfo = payload
  }
}

const actions = {
  // 获取全部数据
  InfoAndListById({
    commit
  }, payload) {
    getInfoAndListById(payload).then(res => {
      commit('updateCarList', res.data);
    })
  },
  // 点击时切换的数据
  getYear({
    commit
  }, payload) {
    commit('updateYearList', payload)
  },
  getCityInfo({
    commit
  }, payload) {
    getCityInfo(payload).then(res => {
      commit('updateCityInfo', res);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
