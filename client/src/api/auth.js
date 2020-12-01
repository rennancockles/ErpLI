// import Vue from 'vue'
import $http from '@/config/http'

export default {
  login: ({ email, password }) => {
    return $http.post('/auth/login', { email, password })
  },

  register: ({ name, lastname, email, password, storeName, apiKey }) => {
    return $http.post('/auth/register', { name, lastname, email, password, store_name: storeName, api_key: apiKey })
  }
}
