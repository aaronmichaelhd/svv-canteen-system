<template>
  <div class="select-role text-center">
    <h1>Role Select Page</h1>
    <v-row class="text-right">
      <v-col>
        <v-btn large color="red" dark @click="signout" class="mx-2">Logout</v-btn>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="ma-2" height="400px">
            <v-img
              class="white--text align-end"
              height="300px"
              src="https://educationbusinessuk.net/sites/default/files/cashless-laptop.jpg"
            >
              <v-card-title></v-card-title>
            </v-img>
            <v-card-actions>
              <v-row>
                <v-col cols="12">
                  <v-btn color="green" dark x-large @click="$router.push('/cashcountercash')">
                    <v-icon>mdi-cash-register</v-icon>Cash Counter
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="ma-2" height="400px">
            <v-img
              class="white--text align-end"
              height="300px"
              src="https://i2.wp.com/www.123freevectors.com/wp-content/uploads/vectorimages/chef-cooking-in-the-kitchen-free-vector.jpg?w=800&q=95"
            >
              <v-card-title></v-card-title>
            </v-img>
            <v-card-actions>
              <v-row class="text-center">
                <v-col cols="12">
                  <v-btn color="green" dark x-large @click="$router.push('/kitchen')">
                    <v-icon>mdi-chef-hat</v-icon>Kitchen
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "SelectRole",
  data() {
    return {};
  },
  methods: {
    signout() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style>
</style>