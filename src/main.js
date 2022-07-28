import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const debug = true
if (debug) {
  window.WS_HOST = 'ws://localhost:7000'
  window.REST_HOST = 'http://localhost:7000'
} else {
  window.WS_HOST = `ws://${location.host}`
  window.REST_HOST = ''
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
