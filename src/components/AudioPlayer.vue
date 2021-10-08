<template>
  <v-card elevation="4" class="mx-3 my-3" max-width="344">
    <v-card-title>Audio Player</v-card-title>
    <v-card-subtitle v-if="loadedAudio !== ''">Current track: {{ loadedAudio }}</v-card-subtitle>
    <v-card-text>
      <v-slider
        prepend-icon="mdi-volume-high"
        hint="Output volume"
        persistent-hint
        thumb-label
        v-model="volume"
        :disabled="loadedAudio === ''"
        @end="setVolume"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
const axios = require('axios').default

export default {
  name: 'AudioPlayer',

  computed: {
    ...mapGetters('audio', ['loadedAudio', 'volume'])
  },

  methods: {
    setVolume (value) {
      axios.post(`${window.REST_HOST}/audio/volume`, { volume: value })
    }
  }
}
</script>
