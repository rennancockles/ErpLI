import Vue from 'vue'
import jwt from 'jsonwebtoken'

let _token = ''
let _user = {}

const storage = {
  clear () {
    localStorage.clear()
    _token = ''
    _user = {}
  },
  setItem (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getItem (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  removeItem (key) {
    return localStorage.removeItem(key)
  },
  isLoggedIn () {
    let token = this.getToken()

    if (!token) return false

    if (token.startsWith('Bearer')) {
      token = token.split(' ')[1]
    }

    try {
      const decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_SECRET)

      return Boolean(decodedToken)

      // if (!decodedToken) return false
      // else return true
    } catch {
      return false
    }
  },
  getToken () {
    if (!_token) {
      _token = this.getItem('authToken')
    }

    return _token
  },
  getUser () {
    if (!_user.id) {
      _user = this.getItem('user')
    }
    return _user
  }
}

Vue.prototype.$storage = storage

export default storage
