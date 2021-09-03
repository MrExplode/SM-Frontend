<template>
  <v-app>
    <v-app-bar app color="teal darken-1" dark>
      <div class="d-flex align-center">
        <v-img
          alt="ShowManager Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.sunstorm.rocks/files/showmanager/icon32.png"
          transition="scale-transition"
          width="40"
        />

        <div class="mt-1">ShowManager</div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),

  mounted () {
    this._webSocket = new WebSocket(`ws://${location.host}`)
    // this._webSocket = new WebSocket('ws://localhost:7000')
    this._webSocket.onopen = () => {
      console.log('[WS] Opened')
    }

    this._webSocket.onclose = (event) => {
      console.log('[WS] Disconnected')
    }

    this._webSocket.onmessage = (message) => {
      const payload = JSON.parse(message.data)
      switch (payload.type) {
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
          // display system logs
          break
      }
    }

    setInterval(() => {
      this._webSocket.send(JSON.stringify({ type: 'ping' }))
    }, 10000)
  }
}
</script>
