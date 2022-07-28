import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/console',
    name: 'Console',
    component: () => import('../views/ConsoleView.vue')
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isLoading) {
    //     next('/')
    //   }
    // }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
