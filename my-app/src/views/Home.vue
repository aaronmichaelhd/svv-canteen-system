<template>
  <div class="home">
    <v-container>
      <v-row class="pa-5">
        <v-col class="pa-5 text-center">
          <v-progress-circular :size="70" :width="7" color="red lighten-1" indeterminate></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import firebase from "firebase";
export default {
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.$router.push("/mapnav");
    //   } else {
    //     this.$router.push("/login");
    //   }
    // });
  }
};
</script>

<style>
</style>