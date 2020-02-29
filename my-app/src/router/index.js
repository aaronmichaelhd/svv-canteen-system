import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import About from '../views/About.vue'
import MapNav from '../views/MapNav.vue'
import Feedback from '../views/Feedback.vue'
import EditProfile from '../views/EditProfile.vue'
import Cart from '../views/Cart.vue'
import Profile from '../views/Profile.vue'
import OrderHistory from '../views/OrderHistory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/orderhistory',
    name: 'OrderHistory',
    component: OrderHistory
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/mapnav',
    name: 'MapNav',
    component: MapNav
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  },
  {
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
