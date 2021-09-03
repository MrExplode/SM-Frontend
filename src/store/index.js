import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTime: '00 : 00 : 00 / 00',
    playing: false,
    paused: false
  },
  mutations: {
    // sync
    setCurrentTime (state, payload) {
      state.currentTime = payload
    },
    setPlaying (state, payload) {
      state.playing = payload
    },
    setPaused (state, payload) {
      state.paused = payload
    }
  },
  actions: {
    // async
  },
  modules: {},
  getters: {
    getCurrentTime: (state) => state.currentTime,
    isPlaying: (state) => state.playing,
    isPaused: (state) => state.paused
  }
})
