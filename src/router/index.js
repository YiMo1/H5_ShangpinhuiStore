import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'


let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (localtion, success, error) {
  if (success && error) {
    originPush.call(this, localtion, success, error)
  } else {
    originPush.call(this, localtion, () => { }, () => { })
  }
}

const routes = [
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    children: [
      {
        path: 'myOrder',
        component: MyOrder
      }, {
        path: 'groupOrder',
        component: GroupOrder
      }, {
        path: '/center',
        redirect: '/center/myOrder'
      }
    ]
  }, {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true }
  }, {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  }, {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopCart') {
        next()
      } else {
        next(false)
      }
    }
  }, {
    path: '/home',
    component: Home,
    meta: { show: true },
  }, {
    path: '/login',
    component: Login,
    meta: { show: false }
  }, {
    path: '/register',
    component: Register,
    meta: { show: false }
  }, {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search'
  }, {
    path: '*',
    redirect: '/home'
  }, {
    path: '/detail/:goodsId',
    component: Detail,
    meta: { show: true }
  }, {
    path: '/addCartSuccess',
    component: AddCartSuccess,
    meta: { show: true }
  }, {
    path: '/shopCart',
    component: ShopCart,
    meta: { show: true }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  let token = store.state.User.token
  let name = store.state.User.userInfo.name
  if (token) {
    if (name) {
      if (to.path == "/login") {
        next('/home')
      } else {
        next()
      }
    } else {
      try {
        await store.dispatch('getUserInfo')
        if (to.path == "/login") {
          next('/home')
        } else {
          next()
        }
      } catch (error) {
        await store.dispatch('userLoguot')
        next()
      }
    }
  } else {
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next("/login")
    } else {
      next()
    }
  }
})

export default router
