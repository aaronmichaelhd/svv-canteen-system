import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from "vue2-google-maps";
import firebase from 'firebase';
Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyDRwvxYk0djzuL-mjulKSGQBYwqIDpZ5oQ",
  authDomain: "svv-canteen-system.firebaseapp.com",
  databaseURL: "https://svv-canteen-system.firebaseio.com",
  projectId: "svv-canteen-system",
  storageBucket: "svv-canteen-system.appspot.com",
  messagingSenderId: "696929468777",
  appId: "1:696929468777:web:e0116514628f40c2d83df8",
  measurementId: "G-ZBVK0WGP77"
};

firebase.initializeApp(firebaseConfig)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDRwvxYk0djzuL-mjulKSGQBYwqIDpZ5oQ"
  },
  installComponents:true
});
new Vue({
  router,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')
