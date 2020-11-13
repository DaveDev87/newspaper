<template>
  <v-app>
    <v-container>
      <v-col>
        <v-row>
          <create-user />
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          Users
        </v-row>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import CreateUser from "../components/CreateUser.vue";
export default {
  components: {
    CreateUser,
  },
};
</script>

<style></style>
