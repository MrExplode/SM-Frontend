<template>
  <v-card elevation="4" class="mx-3 my-3" max-width="390" :loading="playing">
    <v-card-title>Audio Player</v-card-title>
    <v-card-subtitle v-if="loadedAudio !== ''">Current track: {{ loadedAudio }}</v-card-subtitle>
    <v-card-text>
      <v-slider
        prepend-icon="mdi-volume-high"
        hint="Output volume"
        persistent-hint
        thumb-label
        :value="volume"
        :disabled="loadedAudio === ''"
        @end="setVolume"
        class="mb-5"
      />
      <marker-dialog @markerCreate="markerCreate" />
      <div class="d-flex flex-wrap">
        <audio-marker
        v-for="(data, index) in markers"
        :key="index" :label="data.label"
        :time="data.time"
        @jump="markerJump"
        @delete="markerDelete"
        :class="getSpacing(index)"
      />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import AudioMarker from './AudioMarker.vue'
import MarkerDialog from './MarkerDialog.vue'

const axios = require('axios').default

export default {
  name: 'AudioPlayer',

  components: {
    AudioMarker,
    MarkerDialog
  },

  computed: {
    ...mapGetters('audio', ['loadedAudio', 'volume', 'playing', 'markers'])
  },

  methods: {
    setVolume (value) {
      axios.post(`${window.REST_HOST}/audio/volume`, { volume: value })
    },

    markerJump (name) {
      axios.post(`${window.REST_HOST}/audio/markers/jump`, { name: name })
    },

    markerCreate (data) {
      axios.post(`${window.REST_HOST}/audio/markers/add`, data)
    },

    markerDelete (name) {
      axios.post(`${window.REST_HOST}/audio/markers/delete`, { name: name })
    },

    getSpacing (index) {
      if (index === 0) {
        return 'my-2 mr-4'
      } else if (index % 2 === 1) {
        return 'my-2'
      } else {
        return 'my-2 mr-4'
      }
    }
  }
}
</script>
