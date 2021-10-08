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
    }
  }
}
