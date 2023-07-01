import { reqCartList, reqDeleteCartById, reqUpdateCheckById } from '@/api'

const state = {
  cartList: {}
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  async deleteCartListById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code === 200) {
      return "success"
    } else {
      return Promise.reject(new Error("faile"))
    }
  },
  async updateCheckById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckById(skuId, isChecked);
    if (result.code === 200) {
      return "success"
    } else {
      return Promise.reject(new Error("faile"))
    }
  }
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
};
const getters = {
  cartList: () => state.cartList[0] || {},
};



export default {
  state,
  actions,
  mutations,
  getters
}