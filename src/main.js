import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/mock/mockServe"
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { Button, Dialog } from 'vant'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Dialog)

new Vue({
	router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this
		Vue.prototype.$API = API
	},
	render: h => h(App)
}).$mount('#app')
