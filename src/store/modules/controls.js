export default {
  namespaced: true,

  state: () => ({
    playing: false,
    paused: false
  }),

  mutations: {
    setPlaying (state, payload) {
      state.playing = payload
    },
    setPaused (state, payload) {
      state.paused = payload
    }
  },

  getters: {
    playing: (state) => state.playing,
    paused: (state) => state.paused
  }
}
