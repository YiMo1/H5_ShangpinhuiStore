import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
import store from "@/store";

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

requests.interceptors.request.use((config) => {
  if (store.state.detail.UUID) {
    config.headers.userTempId = store.state.detail.UUID
  }
  if (store.state.User.token) {
    config.headers.token = store.state.User.token
  }
  nprogress.start();
  return config
})

requests.interceptors.response.use((res) => {
  nprogress.done();
  return res.data
}, (error) => {
  return Promise.reject(new Error('faile'))
})

export default requests