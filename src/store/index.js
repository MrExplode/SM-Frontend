import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    currentTime: '00 : 00 : 00 / 00',
    playing: false,
    paused: false,
    logs: []
  },
  mutations: {
    // sync
    setLoading (state, payload) {
      state.loading = payload
    },
    setCurrentTime (state, payload) {
      state.currentTime = payload
    },
    setPlaying (state, payload) {
      state.playing = payload
    },
    setPaused (state, payload) {
      state.paused = payload
    },
    addLog (state, payload) {
      if (state.logs.length > 100) {
        state.logs.shift()
      }
      // yeah I know it's O(n)
      state.logs.push(payload)
    },
    loadLog (state, payload) {
      state.logs = payload.slice(0, 100)
    }
  },
  actions: {
    // async
  },
  modules: {},
  getters: {
    isLoading: (state) => state.loading,
    getCurrentTime: (state) => state.currentTime,
    isPlaying: (state) => state.playing,
    isPaused: (state) => state.paused,
    getLogs: (state) => state.logs
  }
})
