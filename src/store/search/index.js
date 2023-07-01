import { reqSearchInfo } from "@/api";

const state = {
  searchInfo: {}
};

const mutations = {
  GETSEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  }
};

const actions = {
  async getSearchList({ commit }, param = {}) {
    let result = await reqSearchInfo(param)
    if (result.code === 200) {
      commit('GETSEARCHINFO', result.data)
    }
  }
};

const getters = {
  goodsList: () => state.searchInfo.goodsList || [],
  attrsList: () => state.searchInfo.attrsList || [],
  trademarkList: () => state.searchInfo.trademarkList || []
};

export default {
  state,
  mutations,
  actions,
  getters
}