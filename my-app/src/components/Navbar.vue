<template>
  <nav>
    <v-app-bar flat app class="red darken-3">
      <v-app-bar-nav-icon class="black--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <span class="white--text font-weight-thin">SVV</span>
        <span>Canteen</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="$router.push('/orderhistory')" fab text color="black">
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="red darken-3">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-if="userData.userType=='visitor'">mdi-account-circle</v-icon>
            <v-img
              v-if="userData.userType=='student' || userData.userType=='faculty'"
              :src="'https://myaccount.somaiya.edu/Images/Id/' + userData.id + '.jpg'"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ userData.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action @click="task('editProfile')">
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" @click="task(item.task)">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["userData", "newdialog"],
  data() {
    return {
      drawer: false,
      item: -1,
      items: [
        { text: "About", icon: "mdi-information-outline", task: "about" },
        { text: "Map", icon: "mdi-map-outline", task: "mapnav" },
        {
          text: "Feedback",
          icon: "mdi-message-alert-outline",
          task: "feedback"
        },
        { text: "Logout", icon: "mdi-exit-to-app", task: "logout" }
      ]
    };
  },
  methods: {
    task(itask) {
      if (itask == "logout") {
        firebase.auth().signOut();
      } else if (itask == "about") {
        this.$router.push("/about");
      } else if (itask == "mapnav") {
        this.$router.push("/mapnav");
      } else if (itask == "feedback") {
        this.$router.push("/feedback");
      } else if (itask == "editProfile") {
        // this.$emit("dialogChanged",true)
        this.dialog = true;
        this.$router.push("/profile");
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>