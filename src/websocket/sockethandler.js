export default class SocketHandler {
  constructor (store) {
    this.$store = store
    this.webSocket = undefined
    this.pingTaskId = -1
    this.retryTaskId = -1
    this.retryCountdown = 5
  }

  retryWebSocket () {
    this.retryCountdown = 5
    this.retryTaskId = setInterval(() => {
      this.displayText = `Reconnecting in ${this.retryCountdown} seconds`
      if (this.retryCountdown > 0) {
        this.retryCountdown--
      } else {
        clearInterval(this.retryTaskId)
        this.webSocket = undefined
        this.createWebSocket()
      }
    }, 1000)
  }

  createWebSocket () {
    this.webSocket = new WebSocket(window.WS_HOST)
    // this._webSocket = new WebSocket('ws://localhost:7000')
    this.webSocket.onopen = () => {
      console.log('[WS] Opened')
      this.pingTaskId = setInterval(() => {
        this.webSocket.send(JSON.stringify({ type: 'ping' }))
      }, 10000)
    }

    this.webSocket.onclose = (event) => {
      console.log('[WS] Disconnected')
      this.$store.commit('setLoading', true)
      if (this.pingTaskId !== -1) {
        clearInterval(this.pingTaskId)
      }
      this.retryWebSocket()
    }

    this.webSocket.onmessage = (message) => {
      try {
        const payload = JSON.parse(message.data)
        this.handleMessage(payload)
      } catch (error) {
        console.log('Failed to handle WS message:', error)
        this.$store.connit('addLog', '[Vue] Failed to handle message: ' + error.toString())
      }
    }
  }

  handleMessage (payload) {
    switch (payload.type) {
      case 'init':
        this.$store.commit('setLoading', false)
        this.$store.commit('loadLog', payload.logs)
        break
      case 'time-change':
        this.$store.commit('setCurrentTime', `${payload.hour} : ${payload.min} : ${payload.sec} / ${payload.frame}`)
        break
      case 'time-start':
        this.$store.commit('controls/playing', true)
        this.$store.commit('controls/paused', false)
        break
      case 'time-pause':
        this.$store.commit('controls/playing', false)
        this.$store.commit('controls/paused', true)
        break
      case 'time-stop':
        this.$store.commit('controls/playing', false)
        this.$store.commit('controls/paused', false)
        break
      case 'log':
        this.$store.commit('addLog', payload.log)
        break
    }
  }
}
