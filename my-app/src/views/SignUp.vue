<template>
  <div class="signup">
    <h1 class="text-center pt-2">SignUp</h1>
    <v-form v-model="valid" @submit.prevent="submitForm" class="mx-4 mt-4">
      <v-container>
        <v-text-field
          outlined
          label="Full Name"
          v-model="name"
          name="name"
          id="name"
          counter="true"
          :rules="[ required('name'),minLength('name',3) ]"
          prepend-inner-icon="mdi-account-circle"
        ></v-text-field>
        <v-text-field
          outlined
          label="Email"
          v-model="email"
          name="email"
          id="email"
          :rules="[required('email'),emailValidation]"
          prepend-inner-icon="mdi-email-variant"
        ></v-text-field>
        <v-text-field
          outlined
          label="Mobile Number (without country code)"
          v-model="mobileNumber"
          name="mobileNumber"
          id="mobileNumber"
          type="tel"
          v-mask="mask"
          counter="true"
          :rules="[required('number'),minLength('number',10)]"
          prepend-inner-icon="mdi-phone-outline"
        ></v-text-field>
        <v-select
          label="User Type"
          v-model="userType"
          name="userType"
          id="userType"
          outlined
          :rules="[required('user type')]"
          :menu-props="{bottom:true, offsetY:true}"
          :items="dropdown_items"
          prepend-inner-icon="mdi-account"
        ></v-select>
        <v-text-field
          v-if="userType!='visitor' && userType!='faculty'"
          outlined
          label="Id"
          v-model="id"
          name="id"
          id="id"
          counter="true"
          v-mask="mask"
          :rules="[required('id'),minLength('id',10)]"
          prepend-inner-icon="mdi-smart-card"
        ></v-text-field>
        <v-text-field
          v-if="userType!='visitor' && userType!='student' && userType=='faculty'"
          outlined
          label="Id"
          v-model="id"
          name="id"
          id="id"
          counter="true"
          v-mask="mask2"
          :rules="[required('id'),minLength('id',6)]"
          prepend-inner-icon="mdi-smart-card"
        ></v-text-field>
        <v-text-field
          outlined
          label="Password"
          v-model="password"
          name="password"
          id="password"
          :type="show1 ? 'text' : 'password'"
          counter="true"
          :rules="[required('password'),minLength('password',8)]"
          prepend-inner-icon="mdi-lock-open"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          outlined
          label="Confirm Password"
          v-model="password2"
          name="confirmPassword"
          id="confirmPassword"
          :type="show2 ? 'text' : 'password'"
          counter="true"
          :rules="[required('password'),minLength('password',8),passwordConfirmation]"
          prepend-inner-icon="mdi-lock"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-row class="text-right">
          <v-col>
            <v-btn :disabled="!valid" type="submit" primary large class="green">SignUp</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
import { mask } from "vue-the-mask";
export default {
  name: "SignUp",
  components: {},
  directives: {
    mask
  },
  data() {
    return {
      mask: "##########",
      mask2: "######",
      name: "",
      email: "",
      mobileNumber: "",
      userType: "",
      id: "",
      valid: false,
      show1: false,
      show2: false,
      password: "",
      password2: "",
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
      },

      dropdown_items: [
        { text: "Student", value: "student" },
        { text: "Faculty", value: "faculty" },
        { text: "Visitor", value: "visitor" }
      ]
    };
  },
  computed: {
    passwordConfirmation() {
      return this.password === this.password2 || "Password must match";
    }
  },
  methods: {
    submitForm() {
      var flag = false
      firebase.database().ref("users").once("value",(snapshot)=>{
        snapshot.forEach(user=>{
          if(user.val().id == this.id){
            alert("College ID Already Registered")
            flag=true
          }
        })
      })
      if(!flag){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user);
          firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .set({
              name: this.name,
              mobileNumber: this.mobileNumber,
              userType: this.userType,
              id: this.id,
              uid: firebase.auth().currentUser.uid
            })
            .then(() => {
              alert("data daal k ho gaya");
            });
        });
      }
    }
  }
};
</script>

<style>
</style>