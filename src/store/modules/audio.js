export default {
  namespaced: true,

  state: () => ({
    loadedAudio: '',
    volume: 100,
    playing: false
  }),

  mutations: {
    setLoadedAudio (state, payload) {
      state.loadedAudio = payload
    },
    setVolume (state, payload) {
      state.volume = payload
    },
    setPlaying (state, payload) {
      state.playing = payload
    }
  },

  getters: {
    loadedAudio: (state) => state.loadedAudio,
    volume: (state) => state.volume,
    playing: (state) => state.playing
  }
}
