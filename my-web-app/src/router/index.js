import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CanteenLogin from '../views/CanteenLogin.vue'
import SelectRole from '../views/SelectRole.vue'
import CashCounterCash from '../views/CashCounterCash'
import CashCounterOnline from '../views/CashCounterOnline'
import Kitchen from '../views/Kitchen'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/canteenlogin',
    name: 'CanteenLogin',
    component: CanteenLogin
  },
  {
    path: '/selectrole',
    name: 'SelectRole',
    component: SelectRole
  },
  {
    path: '/cashcountercash',
    name: 'CashCounterCash',
    component: CashCounterCash
  },
  {
    path: '/cashcounteronline',
    name: 'CashCounterOnline',
    component: CashCounterOnline
  },
  {
    path: '/kitchen',
    name: 'Kitchen',
    component: Kitchen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
