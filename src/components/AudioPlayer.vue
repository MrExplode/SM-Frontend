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
      <v-divider class="mb-4"/>
      <v-col class="d-flex flex-wrap">
        <v-row class="mb-2 justify-center">
          <v-btn @click="quickJump(-10)" class="mx-2" color="light-blue darken-2" dark><v-icon dark>mdi-rewind-10</v-icon></v-btn>
          <v-btn @click="quickJump(-5)" class="mx-2" color="light-blue darken-2" dark><v-icon dark>mdi-rewind-5</v-icon></v-btn>
          <v-btn @click="quickJump(5)" class="mx-2" color="light-blue darken-2" dark><v-icon dark>mdi-fast-forward-5</v-icon></v-btn>
          <v-btn @click="quickJump(10)" class="mx-2" color="light-blue darken-2" dark><v-icon dark>mdi-fast-forward-10</v-icon></v-btn>
        </v-row>
        <v-row class="justify-center">
          <marker-dialog @markerCreate="markerCreate" />
        </v-row>
      </v-col>
      <div class="d-flex flex-wrap mt-2">
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
import AudioMarker from './marker/AudioMarker.vue'
import MarkerDialog from './marker/MarkerDialog.vue'

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

    quickJump (value) {
      axios.post(`${window.REST_HOST}/control/quickJump`, { amount: value })
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
