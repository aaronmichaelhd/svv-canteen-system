<template>
  <v-app>
    <Navbar
      :userData="userData"
      v-if="this.$route.path != '/login' && this.$route.path != '/signup'"
    />
    <v-content>
      <router-view :cid="cid" v-on:cidChanged="cidChanged" :userData="userData" :cart="cart" v-on:cartChanged="cartChanged"></router-view>
    </v-content>
    <BottomNavbar
      :cartCounter="cartCounter"
      v-if="this.$route.path != '/login' && this.$route.path != '/signup'"
    />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import firebase from "firebase";

export default {
  name: "App",

  components: {
    Navbar,
    BottomNavbar
  },

  data() {
    return {
      cart: {},
      cid:null,
      cartCounter: 0,
      userData: {},
      newdialog: false
    };
  },
  methods: {
    cartChanged(value) {
      this.cart = value;
      this.cartCounter = Object.keys(this.cart).length;
    },
    cidChanged(value){
      this.cid = value
    }
    // dialogChanged(value) {
    //   this.dialog = value;
    //   alert("dialoggg");
    // }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            console.log(snapshot.val());
            this.userData = snapshot.val();
            this.userData["email"] = firebase.auth().currentUser.email;
          });
          this.$router.push('/mapnav')
      }
      else{
        this.$router.push('/login')
      }
    });
  }
};
</script>
