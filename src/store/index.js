import Vue from 'vue'
import Vuex from 'vuex'

import controls from './modules/controls.js'
import outputs from './modules/outputs.js'
import audio from './modules/audio.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    currentTime: '00 : 00 : 00 / 00',
    logs: []
  },

  modules: {
    controls,
    outputs,
    audio
  },

  mutations: {
    // sync
    setLoading (state, payload) {
      state.loading = payload
    },
    setCurrentTime (state, payload) {
      state.currentTime = payload
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

  getters: {
    isLoading: (state) => state.loading,
    getCurrentTime: (state) => state.currentTime,
    getLogs: (state) => state.logs
  }
})
