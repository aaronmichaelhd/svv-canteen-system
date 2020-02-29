<template>
  <div>
    <h1 class="text-center">Cash Counter Cash</h1>
    <v-row class="text-right">
      <v-col>
        <v-btn tabindex="-1" large color="red" dark @click="$router.push('/selectrole')" class="mx-2">Select Role</v-btn>
      </v-col>
    </v-row>
    <v-container v-on:keyup="keymonitor">
      <v-form @submit.prevent="submititem">
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Enter Food ID"
                @change="showname"
                outlined
                v-model="foodid"
                type="number"
                tabindex="1"
                ref="foodid"
                :error-messages="error"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Food Item Name"
                tabindex="-1"
                outlined
                v-model="itemName"
                disabled
              ></v-text-field>
              <!-- <v-card>
                <v-card-text>{{itemName}}</v-card-text>
              </v-card>-->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Enter Quantity"
                outlined
                v-model="quantity"
                :mask="mask"
                tabindex="2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="text-right">
            <v-col>
              <v-btn outlined large color="primary" type="submit" tabindex="3">Add Item</v-btn>
              <v-snackbar

              right
              top
      v-model="snackbar"
    >
    {{snackvar}}
    <v-spacer></v-spacer>
      <v-btn fab
        color="primary"
        text
        @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-simple-table class="mb-2" tabindex="-1">
        <template v-slot:default>
          <thead>
            <th>Name</th>
            <th>₹</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in cart" :key="index">
              <td>{{item.name}}</td>
              <td class="text-no-wrap">₹ {{item.price}}/-</td>
              <td>{{item.counter}}</td>
              <td>₹ {{item.price * item.counter}}/-</td>
              <td>
                <v-btn fab text @click="removeitem(item,index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr v-if="(Object.entries(cart).length===0)">
              <td colspan="5" class="text-center grey--text">No data In Cart</td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-right">₹ {{grandTotal}}/-</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row class="text-right">
        <v-col>
          <v-btn v-if="this.cart.length" @click="placeorder">Pay</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { mask } from "vue-the-mask";
export default {
  name: "CashCounterCash",
  props: ["userData"],
  directives: {
    mask
  },
  data() {
    return {
      snackbar: false,
      mask: "##",
      snackvar:"",
      cart: [],
      cid: 0,
      error: null,
      items: [],
      foodid: null,
      quantity: 1,
      itemName: ""
    };
  },
  methods: {
    submititem() {
      var flag = false;
      for (var i in this.items) {
        if (this.items[i].itemId.toString(10).substring(3, 6) == this.foodid) {
          for (var j in this.cart) {
            if (
              this.foodid == this.cart[j].itemId.toString(10).substring(3, 6)
            ) {
              this.snackvar=("Item Already Added");
              this.snackbar=true;
              setTimeout(() => {
                this.snackbar=false;
              }, 2000);
              flag = true;
            }
          }
          if (!flag) {
            this.items[i].counter = this.quantity;
            this.cart.push(this.items[i]);
          }
        }
      }
      console.log(this.foodid);
      this.foodid = "";
      this.quantity = 1;
      this.$refs.foodid.focus();
      // this.cart.push(this.foodid);
    },
    showname() {
      var flag = false;
      for (var i in this.items) {
        if (this.items[i].itemId.toString(10).substring(3, 6) == this.foodid) {
          this.itemName = this.items[i].name;
          flag = true;
        }
      }
      if (!flag) {
        this.error = "itemId not Found";
        setTimeout(() => {
          this.error = null;
        }, 1500);
      }
    },
    removeitem(item, index) {
      this.cart.splice(index, 1);
      this.$refs.foodid.focus();
    },
    keymonitor: function(event) {
      //console.log(event.key);
      if (event.key == "/") {
        this.$refs.foodid.focus();
      }
      
    },
    placeorder() {
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
              status: 1,
              timestamp: now
            })
            .then(() => {
              this.cart = [];
              this.$refs.foodid.focus();
            });
        });
      console.log(this.cart);
      console.log(this.cid);
      console.log(oid);
      console.log(this.status);
      console.log(Date.now());
      console.log(this.userData.uid);
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
  },
  mounted() {
    firebase
      .database()
      .ref("canteens/" + this.userData.id + "/menu/categories")
      .once("value", snapshot => {
        snapshot.forEach(category => {
          category.forEach(item => {
            this.items.push(item.val());
          });
        });
      });
  }
};
</script>

<style>
</style>