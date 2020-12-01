// import Vue from 'vue'
import $http from '@/config/http'

export default {
  login: ({ email, password }) => {
    return $http.post('/auth/login', { email, password })
  }
}
