export default class AudioHandler {
  constructor (store) {
    this.$store = store
  }

  handleAudioMessage (payload) {
    // stuff
    switch (payload.action) {
      case 'load':
        this.$store.dispatch('audio/syncAudio')
        break
      case 'start':
        this.$store.commit('audio/setPlaying', true)
        break
      case 'pause':
        break
      case 'stop':
        this.$store.commit('audio/setPlaying', false)
        break
      case 'volume':
        this.$store.commit('audio/setVolume', payload.volume)
        break
      case 'marker':
        this.$store.dispatch('audio/syncMarkers')
        break
    }
  }
}
