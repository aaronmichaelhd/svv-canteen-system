<template>
  <div class="feedback">
    <h1 class="text-center">Feedback</h1>
    <v-container>
      <v-form v-model="valid" @submit.prevent="submitForm">
        <v-textarea
          auto-grow
          outlined
          counter="true"
          label="Enter Feedback Here"
          :rules="[required('text'),maxLength('number',240)]"
          v-model="feedback"
        ></v-textarea>
        <v-row class="text-right">
          <v-col>
            <v-btn :disabled="!valid" type="submit" dark class="green">Submit Feedback</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  props:["userData"],
  data() {
    return {
      valid: false,
      feedback:"",
      required(propertyType) {
        return v => (v && v.length > 0) || `You must input ${propertyType}`;
      },
      maxLength(propertyType, maxLength) {
        return v =>
          (v && v.length <= maxLength) ||
          `${propertyType} must be less than ${maxLength} characters`;
      }
    };
  },
  methods: {
    submitForm() {
      var ts = Date.now()
      firebase.database().ref("feedbacks/" + ts).set({
        uid:this.userData.uid,
        feedback:this.feedback,
        timestamp: ts
      }).then(()=>{
        alert("ho gaya feedback ")
        this.$router.push('/home')
      })
    }
  }
};
</script>

<style>
</style>