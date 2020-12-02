<template>
  <v-app>
    <v-container fluid>
      <v-row class="d-flex flex-row-reverse">
        <v-col>
          <v-btn outlined color="blue" v-on:click="backToAdmin()">
            <v-icon dark>
              mdi-arrow-left
            </v-icon>
            Admin
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Newsbyauthor/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Newsbyauthor from "../components/Newsbyauthor";
export default {
  data: () => ({
    user: "",
  }),
  components: {
    Newsbyauthor,
  },
  mounted() {
    this.user = this.$route.params.username;
  },
  methods: {
    backToAdmin: function() {
      this.$router.push("/admin");
    },
  },
};
</script>
