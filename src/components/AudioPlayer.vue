<template>
  <v-card elevation="4" class="mx-3 my-3">
    <v-card-title>Audio Player</v-card-title>
    <v-card-subtitle v-if="current !== ''">Current track: {{ current }}</v-card-subtitle>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AudioPlayer',

  computed: {
    ...mapGetters({ current: 'audio/loadedAudio' })
  }
}
</script>
