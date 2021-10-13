<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :disabled="playing || current === ''"
        color="teal lighten-5"
        v-bind="attrs"
        v-on="on"
      >Create marker</v-btn>
    </template>
    <v-card>
      <v-card-title>Create marker</v-card-title>
      <v-card-text>
        <v-col>
          <v-row>
            <v-text-field
              v-model="nameText"
              :rules="nameRule"
              @input="validate"
              clearable
              label="Name"
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="timeText"
              :rules="timeRule"
              @input="validate"
              clearable
              label="Time"
              placeholder="00:00:00/00"
            />
          </v-row>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          :disabled="!validInput"
          @click="markerCreate"
        >Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const validFormat = /([0-9]{2}):([0-9]{2}):([0-9]{2})\/([0-9]{2})/

export default {
  name: 'MarkerDialog',

  data: () => ({
    dialog: false,
    nameText: '',
    timeText: '',
    validInput: false,
    nameRule: [v => v.length > 0 || 'You must enter a name'],
    timeRule: [v => validFormat.test(v) || 'Invalid time format']
  }),

  computed: {
    ...mapGetters({ playing: 'controls/playing' }),
    ...mapGetters({ current: 'audio/loadedAudio' })
  },

  methods: {
    markerCreate () {
      this.dialog = false
      const match = this.timeText.match(validFormat)
      if (match && match.length === 5) {
        this.$emit('markerCreate', {
          name: this.nameText,
          hour: match[1],
          min: match[2],
          sec: match[3],
          frame: match[4]
        })
        // reset
        this.validInput = false
        this.nameText = ''
        this.timeText = ''
      }
    },

    validate () {
      if (this.timeText.match(validFormat) && this.nameText.length > 0) {
        this.validInput = true
        return true
      } else {
        this.validInput = false
        return false
      }
    }
  }
}
</script>
