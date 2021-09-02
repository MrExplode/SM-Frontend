<template>
  <div class="d-flex flex-wrap">
    <time-panel class="flex-grow-1"/>
    <outputs />
    <console />
  </div>
</template>

<script>
import Console from '../components/Console.vue'
import Outputs from '../components/Outputs.vue'
import TimePanel from '../components/TimePanel.vue'

export default {
  name: 'Home',

  components: {
    TimePanel,
    Console,
    Outputs
  }
}
</script>
