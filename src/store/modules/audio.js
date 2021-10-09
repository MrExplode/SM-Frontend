const axios = require('axios').default

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
  },

  actions: {
    syncAudio (state) {
      axios.get(`${window.REST_HOST}/audio/info`).then(response => {
        console.log(response)
        state.commit('setLoadedAudio', response.data.loaded)
        state.commit('setVolume', response.data.volume)
        state.commit('setPlaying', response.data.playing)
      })
    }
  }
}
