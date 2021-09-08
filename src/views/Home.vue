<template>
  <div class="d-flex flex-wrap">
    <time-panel class="flex-grow-1 align-self-start"/>
    <outputs  class="align-self-start"/>
  </div>
</template>

<script>
import Outputs from '../components/Outputs.vue'
import TimePanel from '../components/TimePanel.vue'

export default {
  name: 'Home',

  components: {
    TimePanel,
    Outputs
  }
}
</script>
