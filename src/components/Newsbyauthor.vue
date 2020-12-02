<template>
  <v-data-table
    :headers="headers"
    :items="newslist"
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
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <!-- Extra information and news by user buttons -->
      <v-icon small class="mr-2" v-on:click="editItem(item)">
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    isLoading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Titulo",
        align: "start",
        sortable: true,
        value: "news_title",
      },
      { text: "Contenido", value: "news_body" },
      { text: "Fecha de creación", value: "news_date" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    newslist: [],
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
  mounted() {
    this.fetchNoticias();
  },
  methods: {
    fetchNoticias: function() {
      axios
        .get(
          "https://glycqj1sod.execute-api.us-east-2.amazonaws.com/default/Noticia_author",
          {
            params: {
              author: this.$route.params.username,
            },
          }
        )
        .then(
          (res) => (this.newslist = res.data.Items),
          (this.isLoading = false)
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
