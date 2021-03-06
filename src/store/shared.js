export default {
  state: {
    loading: false,
    error: '',
    notification: []
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    addNotification (state, payload) {
      state.notification.splice(state.notification.length, 1, {
        text: payload.text,
        title: payload.title,
        id: Math.random()
      })
      setTimeout(() => {
        state.notification.splice(0, 1)
      }, 2000)
    }
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    }
  },
  getters: {
    getLoading (state) {
      return state.loading
    },
    getError (state) {
      return state.error
    },
    getNotification (state) {
      return state.notification
    }
  }
}
