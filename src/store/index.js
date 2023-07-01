import Vue from "vue";
import Vuex from 'vuex'
import home from './home'
import search from "./search"
import detail from '@/store/Detail'
import ShopCart from "@/store/ShopCart";
import User from "@/store/User";
import trade from "@/store/trade";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    ShopCart,
    User,
    trade
  }
})