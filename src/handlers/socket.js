import AudioHandler from './audioHandler'
import TimeHandler from './time'
import SchedulerHandler from './scheduler'

export default class SocketHandler {
  constructor (store) {
    this.timeHandler = new TimeHandler(store)
    this.audioHandler = new AudioHandler(store)
    this.schedulerHandler = new SchedulerHandler(store)

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
        this.$store.commit('addLog', '[Vue] Failed to handle message: ' + error.toString())
      }
    }
  }

  handleMessage (payload) {
    switch (payload.type) {
      case 'init':
        this.$store.dispatch('controls/syncPlaying')
        this.$store.dispatch('scheduler/syncRecording')
        this.$store.dispatch('audio/syncAudio')
        this.$store.dispatch('outputs/syncOutputs')
        this.$store.commit('setLoading', false)
        this.$store.commit('loadLog', payload.logs)
        break
      case 'time':
        this.timeHandler.handleTimeMessage(payload)
        break
      case 'audio':
        this.audioHandler.handleAudioMessage(payload)
        break
      case 'scheduler':
        this.schedulerHandler.handleSchedulerMessage(payload)
        break
      case 'log':
        this.$store.commit('addLog', payload.log)
        break
      case 'output':
        this.handleOutputUpdate(payload)
    }
  }

  handleOutputUpdate (payload) {
    switch (payload.name) {
      case 'artnet':
        this.$store.commit('outputs/setArtnet', payload.value)
        break
      case 'audio':
        this.$store.commit('outputs/setAudio', payload.value)
        break
      case 'ltc':
        this.$store.commit('outputs/setLtc', payload.value)
        break
      case 'scheduler':
        this.$store.commit('outputs/setScheduler', payload.value)
        break
    }
  }
}
