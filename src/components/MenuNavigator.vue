<template>
  <div class="d-flex align-center">
    <v-btn v-for="(item, index) in this.menus" :key="index" tile plain x-large :to="item.toLowerCase()" class="mx-3 hidden-sm-and-down">
      {{item }}
    </v-btn>
    <v-menu offset-y bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile plain x-large v-bind="attrs" v-on="on" class="d-md-none px-0 ml-5">Menu</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in this.menus" :key="index" :to="item.toLowerCase()">
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
</div>
</template>

<script>
export default {
  name: 'MenuNavigator',

  data: () => ({
    menus: ['Console', 'Projects', 'Settings']
  })
}
</script>
