export default class TimeHandler {
  constructor (store) {
    this.$store = store
  }

  handleTimeMessage (payload) {
    switch (payload.action) {
      case 'change':
        this.$store.commit('setCurrentTime', `${payload.hour} : ${payload.min} : ${payload.sec} / ${payload.frame}`)
        break
      case 'start':
        this.$store.commit('controls/setPlaying', true)
        this.$store.commit('controls/setPaused', false)
        break
      case 'pause':
        this.$store.commit('controls/setPlaying', false)
        this.$store.commit('controls/setPaused', true)
        break
      case 'stop':
        this.$store.commit('controls/setPlaying', false)
        this.$store.commit('controls/setPaused', false)
        break
    }
  }
}
