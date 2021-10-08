export default class AudioHandler {
  constructor (store) {
    this.$store = store
  }

  handleAudioMessage (payload) {
    // stuff
    switch (payload.action) {
      case 'load':
        this.$store.commit('audio/setLoadedAudio', payload.name)
        break
      case 'start':
        break
      case 'pause':
        break
      case 'stop':
        break
      case 'volume':
        this.$store.commit('audio/setVolume', payload.volume)
        break
    }
  }
}
