import Vue from 'vue'
import axios from 'axios'
import storage from './storage.js'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*'
  }
})

const request = {
  success: req => {
    if (storage.isLoggedIn()) req.headers.Authorization = storage.getItem('authToken')
    return req
  },
  error: error => {
    return Promise.reject(error)
  }
}
http.interceptors.request.use(request.success, request.error)

const response = {
  success: res => {
    return res
  },
  error: error => {
    return Promise.reject(error)
  }
}
http.interceptors.response.use(response.success, response.error)

Vue.prototype.$http = http
Vue.prototype.$axios = axios

export default http
