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
      state.events = payload.map(ev => Object.assign(ev, { executed: false }))
    },
    addEvent (state, payload) {
      state.events.push(Object.assign(payload, { executed: false }))
    },
    eventExecuted (state, payload) {
      state.events.forEach((event, index) => {
        if (JSON.stringify(event.time) === JSON.stringify(payload)) {
          // state.events[index] = { ...state.events[index], ...{ executed: true } }
          event.executed = true
        }
      })
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
