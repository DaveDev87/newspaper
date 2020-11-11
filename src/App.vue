<template>
  <v-app id="app">
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <h1 class="purple--text">Admin</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn v-if="this.isLogged" text v-on:click="signOut()">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "App",
  computed: {
    isLogged() {
      return this.$store.state.isLogged;
    },
  },
  methods: {
    signOut: async function() {
      try {
        await Auth.signOut({ global: true });
        this.$store.commit("changeLoggedStatus", false);
        this.$router.push("/");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
    checkStatus: async function() {
      try {
        await Auth.currentSession();
        this.$store.commit("changeLoggedStatus", true);
      } catch (error) {
        this.$store.commit("changeLoggedStatus", false);
      }
    },
  },

  updated() {
    this.checkStatus();
  },
};
</script>
