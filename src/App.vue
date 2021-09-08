<template>
  <v-app>
    <loading-screen  :visible="loading" :message="displayText"/>
    <v-app-bar app color="teal darken-1" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="ShowManager Logo"
            class="shrink"
            contain
            src="https://cdn.sunstorm.rocks/files/showmanager/icon32.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>
      <menu-navigator />
      <v-spacer></v-spacer>
      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <v-btn icon class="hidden-sm-and-down" href="https://github.com/ShowManager" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingScreen from './components/LoadingScreen.vue'
import MenuNavigator from './components/MenuNavigator.vue'
export default {
  components: {
    LoadingScreen,
    MenuNavigator
  },
  name: 'App',

  data: () => ({
    displayText: 'Connecting...',
    pingTaskId: -1,
    retryTaskId: -1,
    retryCountdown: 5
  }),

  methods: {
    retryWebSocket () {
      this.retryCountdown = 5
      this.retryTaskId = setInterval(() => {
        this.displayText = `Reconnecting in ${this.retryCountdown} seconds`
        if (this.retryCountdown > 0) {
          this.retryCountdown--
        } else {
          clearInterval(this.retryTaskId)
          this._webSocket = undefined
          this.createWebSocket()
        }
      }, 1000)
    },
    createWebSocket () {
      this._webSocket = new WebSocket(window.WS_HOST)
      // this._webSocket = new WebSocket('ws://localhost:7000')
      this._webSocket.onopen = () => {
        console.log('[WS] Opened')
        console.log(this.$router)
        this.pingTaskId = setInterval(() => {
          this._webSocket.send(JSON.stringify({ type: 'ping' }))
        }, 10000)
      }

      this._webSocket.onclose = (event) => {
        console.log('[WS] Disconnected')
        this.$store.commit('setLoading', true)
        if (this.pingTaskId !== -1) {
          clearInterval(this.pingTaskId)
        }
        this.retryWebSocket()
      }

      this._webSocket.onmessage = (message) => {
        const payload = JSON.parse(message.data)
        switch (payload.type) {
          case 'init':
            this.$store.commit('setLoading', false)
            break
          case 'time-change':
            this.$store.commit('setCurrentTime', `${payload.hour} : ${payload.min} : ${payload.sec} / ${payload.frame}`)
            break
          case 'time-start':
            this.$store.commit('setPlaying', true)
            this.$store.commit('setPaused', false)
            break
          case 'time-pause':
            this.$store.commit('setPlaying', false)
            this.$store.commit('setPaused', true)
            break
          case 'time-stop':
            this.$store.commit('setPlaying', false)
            this.$store.commit('setPaused', false)
            break
          case 'log':
            this.$store.commit('addLog', payload.log)
            break
        }
      }
    }
  },

  computed: {
    ...mapGetters({ loading: 'isLoading' })
  },

  mounted () {
    this.createWebSocket()
  }
}
</script>
