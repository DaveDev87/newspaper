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
        <v-btn color="purple" text v-on:click="signUp()">
          ingresar
        </v-btn>
        <v-btn color="purple" text v-on:click="test()">
          test
        </v-btn>
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
  }),
  methods: {
    signUp: async function() {
      try {
        await Auth.signIn(this.username, this.password);
        this.$router.push("/admin");
      } catch (error) {
        console.log("error signin in ", error);
      }
    },
    test: async function() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style></style>
