<template>
  <v-card elevation="4" :loading="playing" class="mx-3 my-3" max-width="344">
    <v-card-title>Current Time</v-card-title>
    <v-card-text>{{ time }}</v-card-text>
    <v-card-actions>
      <v-btn @click="play" :disabled="playing" color="green lighten-4">Play</v-btn>
      <v-btn @click="pause" :disabled="paused" color="yellow lighten-4">Pause</v-btn>
      <v-btn @click="stop" color="red lighten-4">Stop</v-btn>
      <v-spacer />
      <time-dialog :disabled="playing" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TimeDialog from './TimeDialog.vue'
const axios = require('axios').default

export default {
  name: 'Controls',
  components: {
    TimeDialog
  },
  computed: {
    ...mapGetters({ time: 'getCurrentTime' }),
    ...mapGetters('controls', ['playing', 'paused'])
  },
  methods: {
    play () {
      console.log('play')
      axios.post(`${window.REST_HOST}/control/play`)
    },
    pause () {
      console.log('pause')
      axios.post(`${window.REST_HOST}/control/pause`)
    },
    stop () {
      console.log('stop')
      axios.post(`${window.REST_HOST}/control/stop`)
    }
  }
}
</script>
