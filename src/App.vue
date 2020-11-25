<template>
  <v-app id="app">
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <h1 class="purple--text">Admin</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn v-if="this.$store.state.user.status" text v-on:click="signOut()">
        <span class="mr-2">{{ this.$store.state.user.username }}</span>
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
  data: () => ({
    userLog: true,
  }),
  name: "App",
  methods: {
    signOut: async function() {
      try {
        await Auth.signOut({ global: true });
        this.$store.commit("setUser", {
          username: "",
          group: "",
          status: false,
        });
        this.$router.push("/");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
    // userStatus: async function() {
    //   try {
    //     let datos = await Auth.currentSession();
    //     let status = true;
    //     let group = datos.accessToken.payload["cognito:groups"][0];
    //     let username = datos.accessToken.payload["username"];
    //     this.$store.commit("setUser", { username, group, status });
    //     this.userLog = true;
    //     if (group === "admin") {
    //       this.$router.push("/admin");
    //     } else if (group === "editores") {
    //       this.$router.push("/editor");
    //     }
    //   } catch (error) {
    //     console.log("Error handling user ", error);
    //   }
    // },
  },
  created() {
    // this.userStatus();
  },
};
</script>
