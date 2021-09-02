import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTime: '00 : 00 : 00 / 00'
  },
  mutations: {
    // sync
    setCurrentTime (state, payload) {
      state.currentTime = payload
    }
  },
  actions: {
    // async
  },
  modules: {},
  getters: {
    getCurrentTime: (state) => state.currentTime
  }
})
