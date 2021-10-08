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
        console.log('audio start')
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
    }
  }
}
