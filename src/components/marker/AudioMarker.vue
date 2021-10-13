<template>
  <v-card min-width="170" max-width="170">
    <v-card-title>{{ label }}</v-card-title>
    <v-card-subtitle>{{ time }}</v-card-subtitle>
    <v-card-actions>
      <v-btn @click="jump" color="light-blue lighten-2">jump</v-btn>
      <v-spacer />
      <v-btn :disabled="playing" @click="del" color="red lighten-4">delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AudioMarker',

  props: {
    label: String,
    time: String
  },

  computed: {
    ...mapGetters({ playing: 'controls/playing' })
  },

  methods: {
    jump () {
      this.$emit('jump', this.label)
    },

    del () {
      this.$emit('delete', this.label)
    }
  }
}
</script>
