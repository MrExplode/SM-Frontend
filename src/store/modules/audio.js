export default {
  namespaced: true,

  state: () => ({
    loadedAudio: ''
  }),

  mutations: {
    setLoadedAudio (state, payload) {
      state.loadedAudio = payload
    }
  },

  getters: {
    loadedAudio: (state) => state.loadedAudio
  }
}
