const getters = {
  breadcrumbs (state) {
    return state.breadcrumbs
  },
  loading (state) {
    return state.loading
  },

  // AUTH
  // authToken () {
  //   return Auth.getToken()
  // },
  isLoggedIn (state) {
    return state.isLoggedIn
  },

  // USER
  user (state) {
    return state.user
  },
  name (state) {
    return state.user.name
  }

}

export default getters
