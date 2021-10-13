<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :disabled="disabled"
        color="teal lighten-5"
        v-bind="attrs"
        v-on="on"
      >Set</v-btn>
    </template>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="inputText"
          :rules="rule"
          @input="validate"
          clearable
          label="Time"
          placeholder="00:00:00/00"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          :disabled="!validInput"
          @click="setTime"
        >Set</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const validFormat = /([0-9]{2}):([0-9]{2}):([0-9]{2})\/([0-9]{2})/

export default {
  name: 'TimeDialog',

  props: {
    title: String,
    disabled: Boolean
  },

  data: () => ({
    dialog: false,
    inputText: '',
    validInput: false,
    rule: [v => validFormat.test(v) || 'Invalid time format']
  }),

  methods: {
    setTime () {
      this.dialog = false
      const match = this.inputText.match(validFormat)
      if (match && match.length === 5) {
        this.$emit('timeSet', {
          hour: match[1],
          min: match[2],
          sec: match[3],
          frame: match[4]
        })
        // reset
        this.validInput = false
        this.inputText = ''
      }
    },

    validate () {
      if (this.inputText.match(validFormat)) {
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
