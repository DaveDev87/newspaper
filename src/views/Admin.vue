<template>
  <v-app>
    <v-container>
      <v-col>
        <v-row>
          <create-user />
        </v-row>

        <v-row>
          <v-card>
            <v-tabs>
              <v-tab>
                All
              </v-tab>
              <v-tab>
                <v-icon>
                  mdi-book-account
                </v-icon>
                Admin
              </v-tab>
              <v-tab>
                 <v-icon>
                  mdi-pencil
                </v-icon>
                Editores
              </v-tab>
              <v-tab-item>
                <datatable-users />
              </v-tab-item>
              <v-tab-item>
                <datatable-admins />
              </v-tab-item>
              <v-tab-item>
                <datatable-editors />
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-row>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import CreateUser from "../components/CreateUser.vue";
import DatatableUsers from "../components/DatatableUsers.vue";
import DatatableAdmins from "../components/DatatableAdmins.vue";
import DatatableEditors from "../components/DatatableEditors.vue";

export default {
  components: {
    CreateUser,
    DatatableUsers,
    DatatableAdmins,
    DatatableEditors
  },
};
</script>

<style></style>
