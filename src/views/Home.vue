<template>
  <div class="d-flex flex-wrap">
    <time-panel class="flex-grow-1 align-self-start"/>
    <outputs  class="align-self-start"/>
    <audio-player />
  </div>
</template>

<script>
import Outputs from '../components/Outputs.vue'
import TimePanel from '../components/TimePanel.vue'
import AudioPlayer from '../components/AudioPlayer.vue'

export default {
  name: 'Home',

  components: {
    TimePanel,
    Outputs,
    AudioPlayer
  }
}
</script>
