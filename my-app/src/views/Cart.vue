<template>
  <div class="cart">
    <h1 class="text-center mt-1">Cart</h1>
    <v-container>
      <v-simple-table dark class="mb-2">
        <template v-slot:default>
          <thead>
            <th>Name</th>
            <th class="text-center">₹</th>
            <th>Quantity</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in cart" :key="index">
              <td>{{item.name}}</td>
              <td class="text-right text-no-wrap">₹ {{item.price}}/-</td>
              <td>
                <v-btn-toggle v-if="(index in cart) && (cart[index].counter)">
                  <v-btn x-small>
                    <v-icon small @click="counterExists(item,index,-1)">mdi-minus</v-icon>
                  </v-btn>
                  <v-btn :ripple="false" class="white--text" x-small>{{cart[index].counter}}</v-btn>
                  <v-btn x-small>
                    <v-icon small @click="counterExists(item,index,1)">mdi-plus</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </td>
            </tr>
            <tr v-if="(Object.entries(cart).length===0)">
              <td colspan="3" class="text-center grey--text">No data In Cart</td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td></td>
              <td class="text-right">₹ {{grandTotal}}/-</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-row>
            <v-col class="text-right">
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                v-on="on"
                @click="dialog = false"
                :disabled="!grandTotal"
              >Procced with payment</v-btn>
            </v-col>
          </v-row>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Payment Gateway</span>
          </v-card-title>
          <v-card-text v-if="payment == 2">
            <v-container>
              <v-row class="text-center">
                <v-col cols="12">
                  <v-avatar size="100" color="green">
                    <v-icon size="80">mdi-check</v-icon>
                  </v-avatar>
                </v-col>
              </v-row>
              <v-row class="text-center headline">
                <v-col>
                  <v-text>Payment Successful 🤑</v-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text v-if="payment == 1">
            <v-container>
              <v-row class="text-center">
                <v-col cols="12">
                  <v-avatar size="100" color="red">
                    <v-icon size="80">mdi-close</v-icon>
                  </v-avatar>
                </v-col>
              </v-row>
              <v-row class="text-center headline">
                <v-col>
                  <v-text>Payment Failed 😭</v-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text v-if="payment == 0">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Enter Card Number" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Enter CVV"
                    hint="CVV is the three digit number printed at the back of the card"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="OTP" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions v-if="payment == 2">
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="dialog = false;payment = 0;buynow()">Close</v-btn>
          </v-card-actions>
          <v-card-actions v-if="payment == 1">
            <v-spacer></v-spacer>
            <v-btn color="red lighten-1" text @click="dialog = false;payment = 0">Close</v-btn>
          </v-card-actions>
          <v-card-actions v-if="payment == 0">
            <v-spacer></v-spacer>
            <v-btn color="red lighten-1" text @click="payment = 1">Close</v-btn>
            <v-btn color="green" text @click="payment = 2">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["cart", "cid", "userData"],
  data() {
    return {
      dialog: false,
      payment: 0,
      status: 0,
      // cartItems: toArray(this.cart),
      headers: [
        { text: "Name", value: "name" },
        { text: "₹", value: "price" },
        { text: "Quantity", value: "counter" }
      ],
      total: 0
    };
  },
  methods: {
    counterExists(item, index, increment) {
      this.cart[index].counter += increment;
      if (this.cart[index].counter == 0) {
        delete this.cart[index];

        this.$emit("cartChanged", this.cart);
      } else {
        this.$emit("cartChanged", this.cart);
      }
    },
    buynow() {
      var oid = 1;
      var oids = [];
      var now = Date.now();
      firebase
        .database()
        .ref("orders")
        .once("value", snapshot => {
          snapshot.forEach(order => {
            oids.push(order.val().oid);
          });
        })
        .then(() => {
          for (var i in oids) {
            for (var j in oids) {
              if (oid == oids[j]) {
                oid++;
                console.log(i, j, oid);
              }
            }
          }
          alert("OIDDDD" + oid);
          firebase
            .database()
            .ref("orders/" + now)
            .set({
              cart: this.cart,
              cid: this.cid,
              uid: this.userData.uid,
              oid: oid,
              status: this.status,
              timestamp: now
            })
            .then(() => {
              this.cart = [];
              this.$router.push("/orderhistory");
            });
        });
      console.log(this.cart);
      console.log(this.cid);
      console.log(oid);
      console.log(this.status);
      console.log(Date.now());
      console.log(this.userData.uid);

      alert("buy kkiya");
    }
  },
  computed: {
    grandTotal() {
      var ctotal = 0;
      for (var i in this.cart) {
        ctotal += this.cart[i].price * this.cart[i].counter;
      }
      return ctotal;
    }
  }
};
</script>

<style>
</style>