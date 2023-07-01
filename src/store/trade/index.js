import { reqTradeInfo } from '@/api'

const state = {
  tradeInfo: {}
}
const mutations = {
  GETUSERADDRESS(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  }
}
const actions = {
  async getUserAddress({ commit }) {
    let result = await reqTradeInfo()
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
  }
}
const getters = {
  userAddressList: () => state.tradeInfo.userAddressList || [],
  detailArrayList: () => state.tradeInfo.detailArrayList || []
}

export default {
  state,
  mutations,
  actions,
  getters
}