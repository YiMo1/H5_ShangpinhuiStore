import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLoguot } from '@/api'

const state = {
  code: '',
  token: localStorage.getItem("TOKEN"),
  userInfo: {}
}
const actions = {
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userRegister({ commit }, data) {
    let result = await reqRegister(data)
    if (result.code === 200) {
      return "success"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userLogin({ commit }, data) {
    let result = await reqLogin(data)
    if (result.code === 200) {
      localStorage.setItem("TOKEN", result.data.token)
      commit('USERLOGIN', result.data.token)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userLoguot({ commit }) {
    let result = await reqLoguot()
    if (result.code === 200) {
      localStorage.clear()
      commit('USERLOGUOT')
      return "success"
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERLOGUOT(state) {
    state.token = ''
    state.userInfo = {}
  }
}
const getters = {}


export default {
  state,
  mutations,
  getters,
  actions
}