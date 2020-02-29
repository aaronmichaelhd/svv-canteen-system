<template>
  <nav>
    <v-bottom-navigation app horizontal color="primary">
      <v-btn @click="$router.push('/cashcountercash')" x-large>
        <span>Cash Orders</span>
        <v-icon>mdi-cash-100</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/cashcounteronline')" x-large class="mx-5">
        <v-badge :content="onlineOrderCount" v-if="onlineOrderCount">
          <v-icon left>mdi-call-received</v-icon>
          <span>Online Orders</span>
        </v-badge>
          <span v-if="!onlineOrderCount">Online Orders</span>
         <v-icon v-if="!onlineOrderCount">mdi-call-received</v-icon>
      </v-btn>
      <v-btn x-large>
        <span>Report Generator</span>
        <v-icon>mdi-file-table-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </nav>
</template>

<script>
export default {
  name: "BottomNavbar",
  props: ["onlineOrderCount"],
  data() {
    return {};
  }
};
</script>

<style>
</style>