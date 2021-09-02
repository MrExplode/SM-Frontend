<template>
    <v-card class="mx-3 my-3">
        <v-card-title>Outputs</v-card-title>
        <div class="mx-2 d-flex flex-column">
            <v-switch label="ArtNet" color="teal lighten-2" class="my-0"/>
            <v-switch label="Audio" color="teal lighten-2" class="my-0"/>
            <v-switch label="LTC" color="teal lighten-2" class="my-0"/>
            <v-switch label="Scheduler" color="teal lighten-2" class="my-0"/>
        </div>
    </v-card>
</template>

<script>
export default {
  name: 'Outputs'
}
</script>
