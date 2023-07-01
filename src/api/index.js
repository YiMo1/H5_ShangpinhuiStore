import requests from "./request";
import mockRequests from "./mock";

export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

export const reqBannerList = () => mockRequests.get('/banner')

export const reqFloorList = () => mockRequests.get('/floor')

export const reqSearchInfo = (data) => requests({ url: '/list', method: "post", data })

export const reqGoodsInfo = (goodsId) => requests.get(`/item/${goodsId}`)

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)

export const reqCartList = () => requests.get('/cart/cartList')

export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

export const reqUpdateCheckById = (skuId, isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

export const reqGetCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)

export const reqRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data })

export const reqLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })

export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

export const reqLoguot = () => requests({ url: '/user/passport/logout', method: 'get' })

export const reqTradeInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })

export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

export const reqMyOrder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })