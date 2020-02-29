<template>
  <v-app>
    <v-content>
      <router-view
        :orders="orders"
        :ordersKitchen="ordersKitchen"
        :userData="userData"
        @onlineOrderCountChanged="onlineOrderCountChanged"
      ></router-view>
    </v-content>
    <BottomNavbar
      :onlineOrderCount="onlineOrderCount"
      v-if="this.$route.path != '/selectrole' && this.$route.path != '/kitchen' && this.$route.path != '/canteenlogin'"
    />
  </v-app>
</template>

<script>
import BottomNavbar from "@/components/BottomNavbar";
import firebase from "firebase";

export default {
  name: "App",

  components: {
    BottomNavbar
  },

  data: () => ({
    userData: {},
    onlineOrderCount: null,
    orders: [],
    ordersKitchen:[]
  }),
  methods: {
    onlineOrderCountChanged(value) {
      this.onlineOrderCount = value;
    }
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
            firebase
              .database()
              .ref("/orders/")
              .on("value", snapshot => {
                // this.orders = snapshot.val();
                this.orders = [];
                this.ordersKitchen = [];
                snapshot.forEach(order => {
                  if (
                    !order.val().status &&
                    order.val().cid == this.userData.id
                  ) {
                    this.orders.push(order.val());
                    this.onlineOrderCount = this.orders.length;
                    for (var o in this.orders) {
                      var total = 0;
                      for (var c in this.orders[o].cart) {
                        console.log(c);
                        total +=
                          this.orders[o].cart[c].price *
                          this.orders[o].cart[c].counter;
                      }
                      this.orders[o]["grandTotal"] = total;
                    }
                  }
                  if (
                    (order.val().status == 1 || order.val().status == 3 || order.val().status == 4) &&
                    order.val().cid == this.userData.id
                  ) {
                    this.ordersKitchen.push(order.val());
                    this.onlineOrderCount = this.orders.length;
                    for (var ok in this.ordersKitchen) {
                      var totalk = 0;
                      for (var ck in this.ordersKitchen[ok].cart) {
                        console.log(ck);
                        total +=
                          this.ordersKitchen[ok].cart[ck].price *
                          this.ordersKitchen[ok].cart[ck].counter;
                      }
                      this.ordersKitchen[ok]["grandTotal"] = totalk;
                    }
                  }
                });
              });
          });
        this.$router.push("/selectrole");
      } else {
        this.$router.push("/canteenlogin");
      }
    });
  }
};
</script>
