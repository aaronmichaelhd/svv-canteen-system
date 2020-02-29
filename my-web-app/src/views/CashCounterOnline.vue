<template>
  <div>
    <h1 class="text-center">Online Orders</h1>
    <v-container>
      <v-row>
        <v-col cols="3" v-for="(order,index) in orders" :key="index">
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
              <v-btn dark outlined color="red" @click="cancelOrder(order,index)">Cancel</v-btn>
              <v-btn dark outlined color="green" @click="approvedOrder(order,index)">Send To Kitchen</v-btn>
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
  props:['orders'],
  data() {
    return {
      // orders: []
    };
  },
  methods:{
    cancelOrder(order,index){
      this.orders.splice(index,1)
      this.$emit('onlineOrderCountChanged',this.orders.length)
      firebase.database().ref("orders/" + order.timestamp + "/status").set(2)
    },
    approvedOrder(order,index){
      this.orders.splice(index,1)
      this.$emit('onlineOrderCountChanged',this.orders.length)
      firebase.database().ref("orders/" + order.timestamp + "/status").set(1)
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>