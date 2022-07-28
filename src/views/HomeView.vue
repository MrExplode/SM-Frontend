<template>
  <div class="d-flex flex-wrap">
    <time-panel class="flex-grow-1 align-self-start"/>
    <outputs class="align-self-start"/>
    <audio-player class="flex-grow-1 align-self-start"/>
    <scheduler class="flex-grow-1 align-self-start" />
  </div>
</template>

<script>
import Outputs from '../components/OutputsPanel.vue'
import TimePanel from '../components/time/TimePanel.vue'
import AudioPlayer from '../components/AudioPlayer.vue'
import Scheduler from '../components/scheduler/SchedulerPanel.vue'

export default {
  name: 'HomeView',

  components: {
    TimePanel,
    Outputs,
    AudioPlayer,
    Scheduler
  }
}
</script>
