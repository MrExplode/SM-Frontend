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
        <template v-slot:item.time="{ item }">
          <span>{{item.time.hour}}:{{item.time.min}}:{{item.time.sec}}/{{item.time.frame}}</span>
        </template>
        <template v-slot:item.type="{ item }">
          <v-chip dark :color="typeColoring(item.type)">{{ item.type }}</v-chip>
        </template>
        <template v-slot:item.properties="{ item }">
          <div>
            <div v-if="item.type==='osc'">{{ item.packet.address }}</div>
          </div>
        </template>
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
      <v-btn :disabled="playing || recording" @click="deleteEvents" color="red lighten-4">delete</v-btn>
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
        text: 'Time',
        value: 'time',
        // got it on first try, didn't even know what I was doing
        sort: (a, b) => (Number(a.frame) * 25 + Number(a.sec) + Number(a.min) / 60 + Number(a.hour) / (60 * 60)) - (Number(b.frame) * 25 + Number(b.sec) + Number(b.min) / 60 + Number(b.hour) / (60 * 60))
      },
      {
        text: 'Type',
        value: 'type',
        sort: (a, b) => a.type.localeCompare(b.type)
      },
      {
        text: 'Properties',
        value: 'properties',
        sortable: false
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
    },

    deleteEvents () {
      axios.post(`${window.REST_HOST}/scheduler/deleteEvents`, this.selected)
    },

    typeColoring (type) {
      switch (type) {
        case 'jump':
          return 'light-blue lighten-2'
        case 'osc':
          return 'primary'
        case 'pause':
          return 'yellow'
        case 'stop':
          return 'red'
        default:
          return ''
      }
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
