<template>
  <v-app>
    <loading-screen  :visible="loading" :message="displayText"/>
    <v-app-bar app color="teal darken-1" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="ShowManager Logo"
            class="shrink"
            contain
            src="https://cdn.sunstorm.rocks/files/showmanager/icon32.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>
      <v-btn tile plain x-large to="/">
        ShowManager
      </v-btn>
      <div class="pt-1 beta">BETA</div>
      <v-spacer></v-spacer>
      <menu-navigator />
      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <v-btn icon class="hidden-sm-and-down" href="https://github.com/MrExplode/ShowManager" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SocketHandler from './handlers/socket.js'
import LoadingScreen from './components/LoadingScreen.vue'
import MenuNavigator from './components/MenuNavigator.vue'

export default {
  name: 'App',

  components: {
    LoadingScreen,
    MenuNavigator
  },

  data: () => ({
    displayText: 'Connecting...',
    socketHandler: undefined
  }),

  computed: {
    ...mapGetters({ loading: 'isLoading' })
  },

  mounted () {
    this.socketHandler = new SocketHandler(this.$store)
    this.socketHandler.createWebSocket()
  }
}
</script>

<style lang="scss" scoped>
.beta {
  color: #BDBDBD;
}
</style>
