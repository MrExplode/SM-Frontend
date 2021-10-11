export default class SchedulerHandler {
  constructor (store) {
    this.$store = store
  }

  handleSchedulerMessage (payload) {
    // handle
    switch (payload.action) {
      case 'record':
        this.$store.commit('scheduler/setRecording', payload.record)
        break
      case 'eventAdd':
        this.$store.commit('scheduler/addEvent', payload.event)
        break
      case 'syncEvents':
        this.$store.dispatch('scheduler/syncEvents')
        break
    }
  }
}
