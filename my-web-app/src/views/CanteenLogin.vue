<template>
  <div class="login">
    <h1 class="text-center pa-5 mt-2">Canteen Login</h1>
    <v-form class="px-3" @submit.prevent="submitForm" v-model="valid">
      <v-container>
        <v-text-field
          outlined
          label="Email"
          v-model="email"
          name="email"
          id="email"
          :error-messages="error"
          :rules="[required('email'),emailValidation]"
          prepend-inner-icon="mdi-email-variant"
        ></v-text-field>
        <v-text-field
          outlined
          label="Password"
          v-model="password"
          name="password"
          id="password"
          :type="show ? 'text' : 'password'"
          :rules="[required('password'),minLength('password',8)]"
          prepend-inner-icon="mdi-lock-outline"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
        ></v-text-field>

        <v-row class="text-right">
          <v-col>
            <v-btn :disabled="!valid" large type="submit" class="green mb-5 white--text">
              Login
              <v-icon right>mdi-login</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-snackbar color="white" class="black--text" v-model="snackbar" :timeout="5000">
          <span class="font-weight-bold">{{ textMsg }}</span>
          <v-btn fab text class="black--text" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "CanteenLogin",
  components: {},
  data() {
    return {
      snackbar: false,
      show: false,
      valid: null,
      email: "",
      textMsg: "",
      error: null,
      password: "",
      required(propertyType) {
        return v => (v && v.length > 0) || `You must input a ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return v =>
          (v && v.length >= minLength) ||
          `${propertyType} must be atleast ${minLength} characters`;
      },
      emailValidation(value) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    };
  },
  methods: {
    submitForm() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user);
        })
        .catch(error => {
          this.textMsg = error.message;
          this.snackbar = true;
        });
    }
  }
};
</script>