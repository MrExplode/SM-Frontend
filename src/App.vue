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
    this._webSocket.onopen = () => {
      console.log('[WS] Opened')
    }

    this._webSocket.onclose = (event) => {
      console.log('[WS] Disconnected')
    }

    this._webSocket.onmessage = (message) => {
      const payload = JSON.parse(message)
      console.log(`[WS] Received ${payload}`)
    }
  }
}
</script>
