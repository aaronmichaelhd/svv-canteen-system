<template>
  <div class="home">
    <v-container class="text-center" v-if="(this.recommended == null && this.menu == null)">
      <br />
      <v-btn color="green" @click="$router.push('/mapnav')">Please Select Canteen</v-btn>
    </v-container>
    <v-container v-if="loading && !(this.recommended == null && this.menu == null)">
      <v-row class="pa-5">
        <v-col class="pa-5 text-center">
          <v-progress-circular :size="70" :width="7" color="red lighten-1" indeterminate></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="!loading && !(this.recommended == null && this.menu == null)">
      <h2 class="mt-1">Recommended</h2>
      <v-row dense>
        <v-col cols="6" v-for="(item,i) in recommended" :key="i">
          <v-card>
            <v-img
              :src="(item.image)"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100px"
            >
              <div class>
                <span class="ml-2 font-weight-medium">{{item.name}} :</span>
                <span class="mr-2 font-weight-medium">₹ {{item.price}}/-</span>
              </div>
            </v-img>

            <v-card-actions>
              <v-row dense class="text-right">
                <!-- <v-col dense><v-card-text class="caption">₹ {{item.price}}/-</v-card-text></v-col> -->
                <v-col dense cols="12">
                  <v-btn-toggle v-if="!(i in cart)">
                    <v-btn x-small>
                      <v-icon small @click="addToCart(item,i);$emit('cartChanged',cart)">mdi-plus</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                  <v-btn-toggle class="xs-6" v-if="(i in cart) && (cart[i].counter)">
                    <v-btn x-small>
                      <v-icon small @click="counterExists(item,i,-1)">mdi-minus</v-icon>
                    </v-btn>
                    <v-btn :ripple="false" class="white--text" x-small>{{cart[i].counter}}</v-btn>
                    <v-btn x-small>
                      <v-icon small @click="counterExists(item,i,1)">mdi-plus</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>

              <!-- <v-btn v-if="!(index in cart)" small fab text @click="addToCart(item,index,1)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>-->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loading && !(this.recommended == null && this.menu == null)">
      <h2>Menu</h2>
      <v-row justify="center">
        <v-expansion-panels accordion>
          <v-expansion-panel v-for="(cate,i) in menu" :key="i">
            <v-expansion-panel-header class="text-capitalize">{{i.split('-').join(' ')}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list dense class="elevation-5">
                <v-list-item v-for="(item,index) in cate" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                    <v-list-item-subtitle>₹ {{item.price}}/-</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn-toggle v-if="!(index in cart)">
                      <v-btn x-small>
                        <v-icon
                          small
                          @click="addToCart(item,index);$emit('cartChanged',cart)"
                        >mdi-plus</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle v-if="(index in cart) && (cart[index].counter)">
                      <v-btn x-small>
                        <v-icon small @click="counterExists(item,index,-1)">mdi-minus</v-icon>
                      </v-btn>
                      <v-btn :ripple="false" class="white--text" x-small>{{cart[index].counter}}</v-btn>
                      <v-btn x-small>
                        <v-icon small @click="counterExists(item,index,1)">mdi-plus</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      userData: {},
      recommended: {},
      menu: {},
      loading: true
    };
  },
  props: ["cart", "cid"],
  computed: {},
  components: {},
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
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Ho gaya!!!!");
        });
    },
    addToCart(item, index) {
      if (item.image) {
        this.$set(this.cart, index, {
          name: item.name,
          price: item.price,
          itemId: item.itemId,
          counter: 1
        });
      } else {
        this.$set(this.cart, index, item);
      }
      this.cart[index].counter = 1;
    }
  },
  mounted() {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value", snapshot => {
        console.log(snapshot.val());
        this.userData = snapshot.val();
      });

    firebase
      .database()
      .ref("/canteens/" + this.cid + "/menu")
      .once("value", snapshot => {
        console.log(snapshot.val());
        this.recommended = snapshot.val().recommended;
        this.menu = snapshot.val().categories;
      })
      .then(() => {
        this.loading = false;
      });
  }
};
</script>
