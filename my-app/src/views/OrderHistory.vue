<template>
  <div class="orderhistory">
    <h1 class="text-center mt-1">Order History</h1>
    <v-simple-table class="mx-3 mt-3 pa-1">
      <template v-slot:default>
        <thead>
          <th>Oid</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
        </thead>
        <tbody>
          <tr v-for="(order,index) in orders" :key="index">
            <td>{{order.oid}}</td>
            <td>
              <ul>
                <li v-for="(item,i) in order.cart" :key="i">
                  {{item.name}} -
                  <br />
                  ₹ {{item.price}}/- x{{item.counter}}
                </li>
              </ul>
            </td>
            <td class="text-no-wrap">₹ {{grandTotal(order.cart)}}/-</td>
            <td>{{order.status|status}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "OrderHistory",
  props: ["userData"],
  filters: {
    status: function(value) {
      if (value == 0) {
        return "Sent";
      } else if (value == 1) {
        return "Approved";
      } else if (value == 2) {
        return "Cancelled";
      } else if (value == 3) {
        return "Preparing";
      } else if (value == 4) {
        return "Ready";
      } else if (value == 5) {
        return "Delivered";
      }
    }
  },
  methods: {
    grandTotal(cart) {
      var ctotal = 0;
      for (var i in cart) {
        ctotal += cart[i].price * cart[i].counter;
      }
      return ctotal;
    }
  },
  data() {
    return {
      orders: []
      // "1582094882539": {
      //     status:2,
      //     oid:55,
      //   cart: {
      //     "100014": {
      //       counter: 3,
      //       itemId: 100014,
      //       name: "Veg Fried Rice",
      //       price: 50
      //     },
      //     "100015": {
      //       counter: 2,
      //       itemId: 100015,
      //       name: "Triple Fried Rice",
      //       price: 120
      //     }
      //   },
      //   uid: "EtFSMvrT7aYORQ9XqP2jihEraZ72",
      //   cid: 0
      // }
      //   }
    };
  },
  mounted() {
    firebase
      .database()
      .ref("orders")
      .on("value", snapshot => {
        this.orders = [];
        snapshot.forEach(order => {
          console.log(order.val().uid, this.userData.uid);
          if (order.val().uid === this.userData.uid) {
            this.orders.push(order.val());
          }
        });
      });
  }
};
</script>

<style>
</style>