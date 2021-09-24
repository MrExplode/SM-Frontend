<template>
    <v-card class="mx-3 my-3">
        <v-card-title>Outputs</v-card-title>
        <div class="mx-2 d-flex flex-column">
            <v-switch :disabled="playing" label="ArtNet" :input-value="artnet" @change="setArtnet" color="teal lighten-2" class="my-0"/>
            <v-switch :disabled="playing" label="Audio" :input-value="audio" @change="setAudio" color="teal lighten-2" class="my-0"/>
            <v-switch :disabled="playing" label="LTC" :input-value="ltc" @change="setLtc" color="teal lighten-2" class="my-0"/>
            <v-switch :disabled="playing" label="Scheduler" :input-value="scheduler" @change="setScheduler" color="teal lighten-2" class="my-0"/>
        </div>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
const axios = require('axios').default
export default {
  name: 'Outputs',
  data: () => ({
    // asd
  }),
  computed: {
    ...mapGetters({ playing: 'controls/playing' }),
    ...mapGetters('outputs', ['artnet', 'audio', 'ltc', 'scheduler'])
  },
  methods: {
    setArtnet (value) {
      this.$store.commit('outputs/setArtnet', value)
      axios.post(`${window.REST_HOST}/output/artnet`, { enabled: value })
    },
    setAudio (value) {
      this.$store.commit('outputs/setAudio', value)
      axios.post(`${window.REST_HOST}/output/audio`, { enabled: value })
    },
    setLtc (value) {
      this.$store.commit('outputs/setLtc', value)
      axios.post(`${window.REST_HOST}/output/ltc`, { enabled: value })
    },
    setScheduler (value) {
      this.$store.commit('outputs/setScheduler', value)
      axios.post(`${window.REST_HOST}/output/scheduler`, { enabled: value })
    }
  }
}
</script>
