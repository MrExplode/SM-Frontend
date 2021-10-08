<template>
  <div class="inner d-flex flex-column-reverse">
    <span v-for="(log, index) in logs.slice().reverse()" :key="index" :class="getColoring(log)">{{log}}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Console',
  computed: {
    ...mapGetters({ logs: 'getLogs' })
  },

  mounted () {
    window.scrollTo(0, document.body.scrollHeight)
  },

  methods: {
    getColoring (log) {
      const header = log.substring(0, log.split(']', 2).join(']').length)
      if (header.toLowerCase().includes('error')) {
        return 'err'
      } else if (header.toLowerCase().includes('warn')) {
        return 'warn'
      } else if (header.toLowerCase().includes('debug')) {
        return 'debug'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
html, body {
  height: 100%;
}
.inner {
  height: 100%;
  width: 100%;
  margin: 0em;
  background: black;
  color: white;
  font: 16px Inconsolata, monospace;
}

.err {
  color: #F44336;
}

.warn {
  color: #FFA726;
}

.debug {
  color: #757575;
}
</style>
