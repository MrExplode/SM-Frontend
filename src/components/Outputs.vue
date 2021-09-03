<template>
    <v-card class="mx-3 my-3">
        <v-card-title>Outputs</v-card-title>
        <div class="mx-2 d-flex flex-column">
            <v-switch :disabled="playing" label="ArtNet" color="teal lighten-2" class="my-0"/>
            <v-switch :disabled="playing" label="Audio" color="teal lighten-2" class="my-0"/>
            <v-switch :disabled="playing" label="LTC" color="teal lighten-2" class="my-0"/>
            <v-switch :disabled="playing" label="Scheduler" color="teal lighten-2" class="my-0"/>
        </div>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Outputs',
  computed: {
    ...mapGetters({ playing: 'isPlaying' })
  }
}
</script>
