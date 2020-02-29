<template>
  <div>
    <h1 class="text-center">Kitchen</h1>
    <v-row class="text-right">
      <v-col>
        <v-btn
          tabindex="-1"
          large
          color="red"
          dark
          @click="$router.push('/selectrole')"
          class="mx-2"
        >Select Role</v-btn>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="3" v-for="(order,index) in ordersKitchen" :key="index">
          <v-card outlined>
            <v-list-item>
              <v-list-item-content>
                <span class="overline">ORDER ID</span>
                <v-list-item-title class="headline mb-3">{{order.oid}}</v-list-item-title>
                <v-divider></v-divider>
                <ul class="ml-3 mt-3">
                  <li
                    class="subtitle-2"
                    v-for="(i,ind) in order.cart"
                    :key="ind"
                  >{{i.name + " - x" + i.counter}}</li>
                </ul>
              </v-list-item-content>
            </v-list-item>
            <v-row class="text-right pr-5">
              <v-col class="subtitle-1">₹ {{order.grandTotal}}/-</v-col>
            </v-row>

            <v-card-actions class="text-right">
              <v-spacer></v-spacer>
              <v-btn dark outlined color="amber" @click="orderPrepare(order,index)">Prepare</v-btn>
              <v-btn dark outlined color="green" @click="orderReady(order,index)">Ready</v-btn>
              <v-btn dark fab color="red" @click="closeOrder(order,index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
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
  props: ["ordersKitchen"],
  data() {
    return {
      // orders: []
    };
  },
  methods: {
    orderPrepare(order, index) {
      console.log(index);
      //   this.ordersKitchen.splice(index,1)
      // this.ordersKitchen[index][]
      this.$emit("onlineOrderCountChanged", this.ordersKitchen.length);
      firebase
        .database()
        .ref("orders/" + order.timestamp + "/status")
        .set(3);
    },
    orderReady(order, index) {
      console.log(index);
      //   this.ordersKitchen.splice(index,1)
      //   this.$emit('onlineOrderCountChanged',this.ordersKitchen.length)
      firebase
        .database()
        .ref("orders/" + order.timestamp + "/status")
        .set(4);
    },
    closeOrder(order, index) {
      this.ordersKitchen.splice(index, 1);
    }
  },
  mounted() {}
};
</script>

<style>
</style>