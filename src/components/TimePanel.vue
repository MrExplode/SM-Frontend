<template>
  <v-card elevation="4" :loading="playing" class="mx-3 my-3" max-width="344">
    <v-card-title>Current Time</v-card-title>
    <v-card-text>{{ time }}</v-card-text>
    <v-card-actions>
      <v-btn @click="play" :disabled="playing" color="green lighten-4">Play</v-btn>
      <v-btn @click="pause" :disabled="paused" color="yellow lighten-4">Pause</v-btn>
      <v-btn @click="stop" color="red lighten-4">Stop</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
const axios = require('axios').default
export default {
  name: 'Controls',
  data () {
    return {
      playing: false,
      paused: false
    }
  },
  computed: {
    ...mapGetters({ time: 'getCurrentTime' })
  },
  methods: {
    play () {
      console.log('play')
      this.playing = true
      this.paused = false
      axios.post('http://localhost:7000/control/play')
    },
    pause () {
      console.log('pause')
      this.playing = false
      this.paused = true
      axios.post('http://localhost:7000/control/pause')
    },
    stop () {
      console.log('stop')
      this.playing = false
      this.paused = false
      axios.post('http://localhost:7000/control/stop')
    }
  }
}
</script>
