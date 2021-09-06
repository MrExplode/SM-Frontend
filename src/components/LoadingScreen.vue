<template>
  <div v-if="visible" class="container d-flex justify-center align-center">
      <v-sheet
        color="teal"
        elevation="5"
        width="230"
        height="230"
        class="rounded-lg d-flex justify-center align-center flex-column">
          <orbit-spinner
            :animation-duration="1200"
            :size="100"
            color="#00E676"
            class="mb-2"
          />
          <div class="message mt-4">{{ message }}</div>
        </v-sheet>
  </div>
</template>

<script>
import { OrbitSpinner } from 'epic-spinners'
export default {
  name: 'LoadingScreen',
  props: {
    visible: Boolean,
    message: String
  },
  components: {
    OrbitSpinner
  }
}
</script>

<style lang="scss" scoped>
$zIndex: 1000;

.container {
    z-index: $zIndex;
    position: absolute;
    background: #004D40;
    min-width: 100%;
    height: 100%;
}

.message {
  color: white;
}
</style>
