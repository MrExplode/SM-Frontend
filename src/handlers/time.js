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
        this.$store.commit('controls/playing', true)
        this.$store.commit('controls/paused', false)
        break
      case 'pause':
        this.$store.commit('controls/playing', false)
        this.$store.commit('controls/paused', true)
        break
      case 'stop':
        this.$store.commit('controls/playing', false)
        this.$store.commit('controls/paused', false)
        break
    }
  }
}
