<template>
  <div class="inner d-flex flex-column-reverse">
    <span v-for="(log, index) in logs.slice().reverse()" :key="index">{{log}}</span>
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
</style>
