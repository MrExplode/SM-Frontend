const axios = require('axios').default

export default {
  namespaced: true,

  state: () => ({
    loadedAudio: '',
    volume: 100,
    playing: false,
    markers: []
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
    },
    setMarkers (state, payload) {
      state.markers = payload
    }
  },

  getters: {
    loadedAudio: (state) => state.loadedAudio,
    volume: (state) => state.volume,
    playing: (state) => state.playing,
    markers: (state) => state.markers
  },

  actions: {
    syncAudio (state) {
      axios.get(`${window.REST_HOST}/audio/info`).then(response => {
        state.commit('setLoadedAudio', response.data.loaded)
        state.commit('setVolume', response.data.volume)
        state.commit('setPlaying', response.data.playing)
        state.commit('setMarkers', response.data.markers)
      })
    },

    syncMarkers (state) {
      axios.get(`${window.REST_HOST}/audio/markers`).then(response => {
        state.commit('setMarkers', response.data.markers)
      })
    }
  }
}
