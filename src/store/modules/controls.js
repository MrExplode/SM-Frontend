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
    isPlaying: (state) => state.playing,
    isPaused: (state) => state.paused
  }
}
