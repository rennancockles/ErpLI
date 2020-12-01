const mutations = {
  SET_BREADCRUMBS (store, payload) {
    store.breadcrumbs = payload
  },
  SET_LOADING (store, payload) {
    store.loading = payload
  },

  // AUTH
  SET_IS_LOGGED_IN (store, payload) {
    store.isLoggedIn = payload
  },

  // USER
  SET_USER (store, payload) {
    store.user = payload
  },
  UPDATE_USER (store, payload) {
    Object.assign(store.user, payload)
  }
}

export default mutations
