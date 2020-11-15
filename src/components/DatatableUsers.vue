<template>
  <v-data-table
    :headers="headers"
    :items="userlist"
    sort-by="name"
    class="elevation-1"
    :loading="this.isLoading"
    loading-text="Por favor espere..."
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <!-- <v-card-title>
              <span class="headline">Usuario: {{ editedItem.Username }}</span>
            </v-card-title> -->

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
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
                  <v-col>
                    <v-switch inset v-model="editedItem.Enabled" label="Habilitar/Desabilitar Usuario">

                    </v-switch>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { Auth, API } from "aws-amplify";
import moment from "moment";
export default {
  data: () => ({
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

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
      let apiName = "AdminQueries";
      let path = "/listUsers";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      try {
        const { Users } = await API.get(apiName, path, myInit);
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

    editItem(item) {
      this.editedItem = item;
      // this.editedIndex = this.userlist.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userlist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.userlist.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.userlist[this.editedIndex], this.editedItem);
      // } else {
      //   this.userlist.push(this.editedItem);
      // }
      // this.close();
    },
  },
};
</script>

<style></style>
