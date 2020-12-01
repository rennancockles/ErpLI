import storage from '@/config/storage.js'

const actions = {
  setBreadcrumbs ({ commit }, payload) {
    commit('SET_BREADCRUMBS', payload)
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },

  // AUTH
  setIsLoggedIn ({ commit }, payload) {
    commit('SET_IS_LOGGED_IN', payload)
  },
  logIn ({ dispatch }, payload) {
    if (payload && payload.authToken && payload.user) {
      storage.setItem('authToken', payload.authToken)
      storage.setItem('user', payload.user)

      dispatch('setUser', payload.user)
      dispatch('setIsLoggedIn', true)
    }
  },

  // USER
  setUser ({ commit }, payload) {
    commit('SET_USER', payload)
  },
  updateUser ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  }
}

export default actions
