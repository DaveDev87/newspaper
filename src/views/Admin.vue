<template>
  <v-app>
    <v-container>
      <v-col>
        <v-row>
          <create-user />
        </v-row>

        <v-row>
          <datatable-users />
        </v-row>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import CreateUser from "../components/CreateUser.vue";
import DatatableUsers from "../components/DatatableUsers.vue";
export default {
  components: {
    CreateUser,
    DatatableUsers,
  },
};
</script>

<style></style>
