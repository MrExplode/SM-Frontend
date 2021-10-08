export default {
  namespaced: true,

  state: () => ({
    loadedAudio: '',
    volume: 100
  }),

  mutations: {
    setLoadedAudio (state, payload) {
      state.loadedAudio = payload
    },
    setVolume (state, payload) {
      state.volume = payload
    }
  },

  getters: {
    loadedAudio: (state) => state.loadedAudio,
    volume: (state) => state.volume
  }
}
