export default {
  namespaced: true,

  state: () => ({
    artnet: false,
    audio: false,
    ltc: false,
    scheduler: false
  }),

  mutations: {
    set (state, payload) {
      state.artnet = payload.artnet
      state.audio = payload.audio
      state.ltc = payload.ltc
      state.scheduler = payload.scheduler
    },
    setArtnet (state, payload) {
      state.artnet = payload
    },
    setAudio (state, payload) {
      state.audio = payload
    },
    setLtc (state, payload) {
      state.ltc = payload
    },
    setScheduler (state, payload) {
      state.scheduler = payload
    }
  },

  getters: {
    artnet: (state) => state.artnet,
    audio: (state) => state.audio,
    ltc: (state) => state.ltc,
    scheduler: (state) => state.scheduler
  }
}
