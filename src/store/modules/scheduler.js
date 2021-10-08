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
  }
}
