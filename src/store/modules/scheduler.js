const axios = require('axios').default

export default {
  namespaced: true,

  state: () => ({
    events: [],
    recording: false
  }),

  mutations: {
    setRecording (state, payload) {
      state.recording = payload
    }
  },

  getters: {
    recording: (state) => state.recording
  },

  actions: {
    syncRecording (state) {
      axios.get(`${window.REST_HOST}/scheduler/record`).then(response => {
        state.commit('setRecording', response.data.recording)
      })
    }
  }
}
