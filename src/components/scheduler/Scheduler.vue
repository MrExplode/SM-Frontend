<template>
  <v-card elevation="4" class="mx-3 my-3" min-width="400" max-width="500">
    <v-card-title>Scheduler</v-card-title>
    <v-card-text>
      <v-data-table
        v-model="selected"
        show-select
        single-select
        multi-sort
        :headers="headers"
        :items="events"
        class="elevation-1"
      >
        <template v-slot:item.time="{ item }">
          <div v-if="item.executed === true">
            <v-chip ripple small color="green lighten-3">{{item.time.hour}}:{{item.time.min}}:{{item.time.sec}}/{{item.time.frame}}</v-chip>
          </div>
          <div v-else>
            <span>{{item.time.hour}}:{{item.time.min}}:{{item.time.sec}}/{{item.time.frame}}</span>
          </div>
        </template>
        <template v-slot:item.type="{ item }">
          <v-chip ripple dark :color="typeColoring(item.type)">{{ item.type }}</v-chip>
        </template>
        <template v-slot:item.properties="{ item }">
          <div>
            <div v-if="item.type==='osc'">{{ item.packet.address }} {{ item.packet.parameter }}</div>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <event-dialog :disabled="playing || recording" @eventAdd="eventAdd" />
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
import EventDialog from './EventDialog.vue'
import { mapGetters } from 'vuex'
import Sortable from 'sortablejs'
const axios = require('axios').default

export default {
  name: 'Scheduler',

  components: {
    EventDialog
  },

  data: () => ({
    selected: [],
    headers: [
      {
        text: 'Time',
        value: 'time',
        sort: (a, b) => { console.log(a, b); return a.millisecLength - b.millisecLength },
        filter: () => true
      },
      {
        text: 'Type',
        value: 'type',
        sort: (a, b) => a.localeCompare(b)
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
      console.log(this.events)
      axios.post(`${window.REST_HOST}/scheduler/record`, { enabled: value })
    },

    eventAdd (event) {
      axios.post(`${window.REST_HOST}/scheduler/events/add`, { event: event })
    },

    deleteEvents () {
      axios.post(`${window.REST_HOST}/scheduler/events/delete`, this.selected)
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
