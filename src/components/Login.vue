<template>
  <v-card>
    <v-card-title>
      Iniciar sesion
    </v-card-title>
    <v-form>
      <v-container>
        <v-text-field
          label="Usuario"
          v-model="username"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          label="Contraseña"
          v-model="password"
          :counter="8"
          type="password"
          required
        >
        </v-text-field>
      </v-container>
      <v-card-actions>
        <v-btn
          color="purple"
          text
          v-on:click="signIn()"
          :loading="btnisLoading"
        >
          ingresar
        </v-btn>
        <!-- <v-btn color="purple" text v-on:click="test()">
          test
        </v-btn> -->
        <v-snackbar v-model="thereIsAnError">
          {{ errorSigningIn }}
        </v-snackbar>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    btnisLoading: false,
    thereIsAnError: false,
    errorSigningIn: "",
  }),
  methods: {
    signIn: async function() {
      this.btnisLoading = true;
      try {
        await Auth.signIn(this.username, this.password);
        await this.userStatus();
        this.btnisLoading = false;
      } catch (error) {
        console.log("error signin in ", error);
        this.errorSigningIn = error.message;
        this.thereIsAnError = true;
        this.btnisLoading = false;
      }
    },
    test: async function() {
      try {
        let user = await Auth.currentAuthenticatedUser();
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    },
    userStatus: async function() {
      try {
        let datos = await Auth.currentSession();
        let status = true;
        let group = datos.accessToken.payload["cognito:groups"][0];
        let username = datos.accessToken.payload["username"];
        this.$store.commit("setUser", { username, group, status });
        group === "admin"
          ? this.$router.push("/admin")
          : this.$router.push("/editor");
      } catch (error) {
        console.log("Error handling user ", error);
      }
    },
  },
  created() {
    this.userStatus();
  },
};
</script>

<style></style>
