import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/store/Utils/uuid_token";

const state = {
  goodsInfo: {},
  UUID: getUUID()
};

const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
};

const actions = {
  async getGoodsInfo({ commit }, goodsId) {
    let result = await reqGoodsInfo(goodsId)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      return "success"
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
};

const getters = {
  categoryView: () => state.goodsInfo.categoryView || {},
  skuInfo: () => state.goodsInfo.skuInfo || {},
  spuSaleAttrList: () => state.goodsInfo.spuSaleAttrList || []
};

export default {
  state,
  mutations,
  actions,
  getters
}