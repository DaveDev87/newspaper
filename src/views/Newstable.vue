<template>
  <v-data-table
    :headers="headers"
    :items="userlist"
    :search="search"
    sort-by="name"
    class="elevation-1"
    :loading="this.isLoading"
    loading-text="Por favor espere..."
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Noticias</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon color="blue" v-on:click="fetchUsers()">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar usuario"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col>
                    <!--Information fields -->
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Nombre de usuario</v-list-item-title>
                        <v-list-item-subtitle>{{
                          editedItem["Username"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          >Correo electronico</v-list-item-title
                        >
                        <v-list-item-subtitle>{{
                          editedItem["email"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          >Estado de la cuenta</v-list-item-title
                        >
                        <v-list-item-subtitle>{{
                          editedItem["Enabled"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Creado</v-list-item-title>
                        <v-list-item-subtitle>{{
                          editedItem["UserCreateDate"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Confirmación</v-list-item-title>
                        <v-list-item-subtitle>{{
                          editedItem["UserStatus"]
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <!-- Action buttons -->
                    <v-row>
                      <v-col>
                        <v-btn
                          v-if="!editedItem.Enabled"
                          v-on:click="enableUser(editedItem.Username)"
                          outlined
                          color="green"
                        >
                          Habilitar
                        </v-btn>
                        <v-btn
                          v-else-if="editedItem.Enabled"
                          v-on:click="disableUser(editedItem.Username)"
                          outlined
                          color="blue"
                        >
                          Deshabilitar
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          v-if="editedItem.UserStatus === 'UNCONFIRMED'"
                          outlined
                          color="green"
                          v-on:click="confirmUserSignUp(editedItem.Username)"
                        >
                          Confirmar cuenta
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <!-- Extra information and news by user buttons -->
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small v-on:click="NewsByUser(item.Username)">
        mdi-newspaper
      </v-icon>
    </template>
    <template v-slot:item.Enabled="{ item }">
      <v-chip label :color="getColor(item.Enabled)" dark>
        {{ item.Enabled }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { Auth, API } from "aws-amplify";
import moment from "moment";
export default {
  data: () => ({
    search: "",
    isLoading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "Username",
      },
      { text: "Habilitado", value: "Enabled" },
      { text: "Email", value: "email" },
      { text: "Estado de cuenta", value: "UserStatus" },
      { text: "Fecha de creación", value: "UserCreateDate" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    userlist: [],
    editedIndex: -1,
    editedItem: {
      username: "",
      Enabled: "",
      email: "",
      UserStatus: "",
      UserCreateDate: "",
    },
    defaultItem: {
      name: "",
      rol: "",
      email: "",
      state: "",
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      let init = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      try {
        const { Users } = await API.get("AdminQueries", "/listUsers", init);
        this.userlist = Users.map((item) => ({
          Username: item.Username,
          UserStatus: item.UserStatus,
          Enabled: item.Enabled,
          email: item.Attributes[2].Value,
          UserCreateDate: moment(item.UserCreateDate).format(
            "MMM DD, YYYY LTS"
          ),
        }));
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    async enableUser(name) {
      let init = {
        body: {
          username: name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      try {
        await API.post("AdminQueries", "/enableUser", init);
        this.fetchUsers();
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    async disableUser(name) {
      let init = {
        body: {
          username: name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      try {
        await API.post("AdminQueries", "/disableUser", init);
        this.fetchUsers();
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    async confirmUserSignUp(name) {
      let init = {
        body: {
          username: name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      try {
        await API.post("AdminQueries", "/confirmUserSignUp", init);
        this.fetchUsers();
      } catch (error) {
        console.error("Error confirming user account: ", error);
      }
    },
    NewsByUser(username) {
      this.$router.push(`/news/${username}`);
    },

    getColor(item) {
      if (item === true) return "green";
      else if (item === false) return "blue";
    },

    editItem(item) {
      this.editedItem = item;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
