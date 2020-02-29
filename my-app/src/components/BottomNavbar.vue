<template>
  <nav>
    <v-bottom-navigation app grow fixed color="red">
      <v-btn @click="$router.push('/home')">
        <span>Home</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/cart')">
        <span>Cart</span>
        <v-badge
          v-if="cartCounter"
          :content="cartCounter"
          offset-x="-12"
          offset-y="22"
          bottom
          color="red lighten-1"
        ></v-badge>
        <v-icon>mdi-cart-minus</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/profile')">
        <span>Profile</span>
        <v-icon>mdi-clipboard-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </nav>
</template>

<script>
export default {
  props: ["cartCounter"]
};
</script>

<style>
</style>