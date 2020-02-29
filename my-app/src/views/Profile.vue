<template>
  <div class="profile">
    <h1 class="text-center mt-1">Profile</h1>
    <v-container>
      <v-card class="pa-1 mb-1">
        <v-row justify="space-around" class="ma-3">
          <v-avatar size="100" tile color="grey">
            <v-icon v-if="userData.userType=='visitor'">mdi-account</v-icon>
            <v-img
              v-if="userData.userType=='student' || userData.userType=='faculty'"
              :src="'https://myaccount.somaiya.edu/Images/Id/' + userData.id + '.jpg'"
            ></v-img>
          </v-avatar>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="text-right" cols="5">
            <v-icon>mdi-smart-card</v-icon>
          </v-col>
          <v-col>
            <span>{{userData.id}}</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="text-right" cols="5">
            <v-icon>mdi-email-variant</v-icon>
          </v-col>
          <v-col>
            <span>{{userData.email}}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-right" cols="5">
            <v-icon>mdi-account-outline</v-icon>
          </v-col>
          <v-col>
            <span>{{userData.name}}</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="text-right" cols="5">
            <v-icon>mdi-phone-outline</v-icon>
          </v-col>
          <v-col>
            <span>{{userData.mobileNumber}}</span>
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col class="text-right mx-3">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-row>
                <v-spacer></v-spacer>
                <v-btn dark color="green" v-on="on">
                  Edit Profile
                  <v-icon right>mdi-pencil-outline</v-icon>
                </v-btn>
              </v-row>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Id"
                        disabled
                        prepend-icon="mdi-smart-card"
                        v-model="userData.id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email"
                        disabled
                        prepend-icon="mdi-email-variant"
                        v-model="userData.email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Full Name"
                        v-model="name"
                        name="name"
                        id="name"
                        counter="true"
                        :rules="[ required('name'),minLength('name',3) ]"
                        prepend-icon="mdi-account-circle"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Mobile Number (without country code)"
                        v-model="mobileNumber"
                        name="mobileNumber"
                        id="mobileNumber"
                        v-mask="mask"
                        counter="true"
                        :rules="[required('number'),minLength('number',10)]"
                        prepend-icon="mdi-phone-outline"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="green" text @click="dialog = false;saveChanges()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-snackbar color="white" class="black--text" v-model="snackbar" :timeout="2000">
        <span class="font-weight-bold">Changes Saved Successfully</span>
        <v-btn fab text class="black--text" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import firebase from "firebase";
export default {
  name: "Profile",
  directives: {
    mask
  },
  methods: {
    saveChanges() {
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .update({
          name: this.name,
          mobileNumber: this.mobileNumber,
          userType: this.userData.userType,
          id: this.userData.id,
          uid: firebase.auth().currentUser.uid
        })
        .then(() => {
          this.snackbar = true;
        });
    }
  },
  props: ["userData"],
  computed: {},
  data() {
    return {
      mask: "##########",
      snackbar: false,
      dialog: false,
      name: this.userData.name,
      mobileNumber: this.userData.mobileNumber,
      required(propertyType) {
        return v => (v && v.length > 0) || `You must input a ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return v =>
          (v && v.length >= minLength) ||
          `${propertyType} must be atleast ${minLength} characters`;
      },
      maxLength(propertyType, maxLength) {
        return v =>
          (v && v.length <= maxLength) ||
          `${propertyType} must be less than ${maxLength} characters`;
      },
      emailValidation(value) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    };
  }
};
</script>

<style>
</style>