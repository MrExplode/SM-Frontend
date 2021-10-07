<template>
  <div class="d-flex flex-wrap">
    <time-panel class="flex-grow-1 align-self-start"/>
    <outputs class="align-self-start"/>
    <scheduler class="flex-grow-1 align-self-start" />
    <audio-player class="align-self-start"/>
  </div>
</template>

<script>
import Outputs from '../components/Outputs.vue'
import TimePanel from '../components/TimePanel.vue'
import AudioPlayer from '../components/AudioPlayer.vue'
import Scheduler from '../components/Scheduler.vue'

export default {
  name: 'Home',

  components: {
    TimePanel,
    Outputs,
    AudioPlayer,
    Scheduler
  }
}
</script>
