import { EventBus } from './eventbus'

export default class AudioHandler {
  constructor (store) {
    this.$store = store
  }

  handleAudioMessage (payload) {
    // stuff
    switch (payload.action) {
      case 'load':
        break
      case 'start':
        break
      case 'pause':
        break
      case 'stop':
        break
    }
  }
}
