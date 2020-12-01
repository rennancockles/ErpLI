import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import authRoutes from './auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      auth: true
    }
  },
  ...authRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const needAuth = to.matched.some(record => record.meta.auth)

  if (needAuth) {
    if (!Vue.prototype.$storage.isLoggedIn()) {
      router.push({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
