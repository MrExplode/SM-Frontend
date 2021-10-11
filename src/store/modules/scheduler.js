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
    },
    setEvents (state, payload) {
      state.events = payload
    },
    addEvent (state, payload) {
      state.events.push(payload)
    }
  },

  getters: {
    recording: (state) => state.recording,
    events: (state) => state.events
  },

  actions: {
    syncRecording (state) {
      axios.get(`${window.REST_HOST}/scheduler/record`).then(response => {
        state.commit('setRecording', response.data.recording)
      })
    },

    syncEvents (state) {
      axios.get(`${window.REST_HOST}/scheduler/events`).then(response => {
        state.commit('setEvents', response.data.events)
      })
    }
  }
}
