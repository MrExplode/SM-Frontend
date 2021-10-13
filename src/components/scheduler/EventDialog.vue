<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ attrs, on }">
        <v-btn
          :disabled="disabled"
          v-bind="attrs"
          v-on="on"
          color="green lighten-4"
        >
        new</v-btn>
    </template>
    <v-card>
      <v-card-title>Add Event</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="timeText"
          :rules="timeRule"
          @input="validate"
          clearable
          label="Execute time"
          placeholder="00:00:00/00"
        />
        <v-select
          v-model="selectedType"
          :items="types"
          :hint="`${selectedType.desc}`"
          @input="validate"
          label="Type"
          return-object
        />
        <v-text-field
          v-if="selectedType.value !== undefined && selectedType.value === 'jump'"
          v-model="jumpTimeText"
          :rules="timeRule"
          @input="validate"
          clearable
          label="Jump to"
          placeholder="00:00:00/00"
        />
        <v-text-field
          v-if="selectedType.value !== undefined && selectedType.value === 'osc'"
          v-model="oscAddress"
          :rules="addressRule"
          @input="validate"
          label="OSC Address"
          clearable
        />
        <v-text-field
          v-if="selectedType.value !== undefined && selectedType.value === 'osc'"
          v-model="oscParameter"
          label="OSC Parameter"
          clearable
        />
        <v-select
          v-if="selectedType.value !== undefined && selectedType.value === 'osc'"
          v-model="selectedOscType"
          :items="oscTypes"
          @input="validate"
          label="Parameter type"
          return-object
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="emitEvent"
          :disabled="!valid"
        >Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const validFormat = /([0-9]{2}):([0-9]{2}):([0-9]{2})\/([0-9]{2})/

export default {
  name: 'EventDialog',

  props: {
    disabled: Boolean
  },

  data: () => ({
    dialog: false,
    timeText: '',
    timeRule: [v => validFormat.test(v) || 'Invalid time format'],
    selectedType: {},
    oscAddress: '',
    addressRule: [v => v.length > 0 || 'Enter an address'],
    oscParameter: '',
    selectedOscType: {},
    jumpTimeText: '',
    valid: false,
    types: [
      { text: 'OSC Dispatch', desc: 'Sends an OSC packet to the configured target', value: 'osc' },
      { text: 'Time jump', desc: 'Sets the global time', value: 'jump' },
      { text: 'Time pause', desc: 'Pauses the global time', value: 'pause' },
      { text: 'Time stop', desc: 'Stops the global time', value: 'stop' }
    ],
    oscTypes: [
      { text: 'Integer', value: 'integer' },
      { text: 'Boolean', value: 'boolean' },
      { text: 'Float', value: 'float' },
      { text: 'String', value: 'string' },
      { text: 'Empty', value: 'empty' }
    ]
  }),

  methods: {
    validate () {
      const usingOsc = this.selectedType.value !== undefined && this.selectedType.value === 'osc'
      const validOsc = usingOsc ? (this.oscAddress.length > 0 && this.selectedOscType.value !== undefined) : true
      const usingJump = this.selectedType.value !== undefined && this.selectedType.value === 'jump'
      const validJump = usingJump ? validFormat.test(this.jumpTimeText) : true
      const validBase = validFormat.test(this.timeText) && this.selectedType.value !== undefined
      if (validBase && validOsc && validJump) {
        this.valid = true
      } else {
        this.valid = false
      }
    },

    emitEvent () {
      this.dialog = false
      const usingOsc = this.selectedType.value !== undefined && this.selectedType.value === 'osc'
      const usingJump = this.selectedType.value !== undefined && this.selectedType.value === 'jump'
      const match = this.timeText.match(validFormat)
      const scheduledEvent = {
        time: {
          hour: match[1],
          min: match[2],
          sec: match[3],
          frame: match[4]
        },
        type: this.selectedType.value
      }
      if (usingOsc) {
        scheduledEvent.packet = {
          parameterType: this.selectedOscType.value,
          parameter: this.oscParameter,
          address: this.oscAddress
        }
      }
      if (usingJump) {
        const match2 = this.jumpTimeText.match(validFormat)
        scheduledEvent.jumpTime = {
          hour: match2[1],
          min: match2[2],
          sec: match2[3],
          frame: match2[4]
        }
      }
      this.$emit('eventAdd', scheduledEvent)
      this.timeText = ''
      this.selectedType = {}
      this.oscAddress = ''
      this.oscParameter = ''
      this.selectedOscType = {}
      this.jumpTimeText = ''
    }
  }
}
</script>
