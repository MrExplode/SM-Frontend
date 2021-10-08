<template>
  <v-card elevation="4" class="mx-3 my-3" min-width="400" max-width="500">
    <v-card-title>Scheduler</v-card-title>
    <v-card-text>
      <v-data-table
        hide-default-footer
        v-sortable-data-table
        show-select
        multi-sort
        v-model="selected"
        :headers="headers"
        :items="events"
        class="elevation-1"
      >

      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="playing || recording" color="green lighten-4">new</v-btn>
      <v-switch
        :input-value="recording"
        :disabled="playing"
        :loading="recording"
        @change="setRecording"
        label="Record OSC"
        color="red"
        class="mx-5"
      />
      <v-spacer/>
      <v-btn :disabled="playing || recording" color="red lighten-4">delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Sortable from 'sortablejs'
const axios = require('axios').default

export default {
  name: 'Scheduler',

  data: () => ({
    selected: [],
    headers: [
      {
        text: 'Time'
      },
      {
        text: 'Type'
      }
    ]
  }),

  computed: {
    ...mapGetters({ playing: 'controls/playing' }),
    ...mapGetters('scheduler', ['events', 'recording'])
  },

  methods: {
    setRecording (value) {
      axios.post(`${window.REST_HOST}/scheduler/record`, { enabled: value })
    }
  },

  directives: {
    sortableDataTable: {
      bind (el, binding, vnode) {
        const options = {
          animation: 150,
          onUpdate: function (event) {
            vnode.child.$emit('sorted', event)
          }
        }
        Sortable.create(el.getElementsByTagName('tbody')[0], options)
      }
    }
  }
}
</script>
