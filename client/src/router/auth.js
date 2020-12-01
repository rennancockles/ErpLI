const routes = [
  {
    path: '/auth/login',
    name: 'auth.login',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/Login.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/auth/logout',
    name: 'auth.logout',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/Logout.vue'),
    meta: {
      auth: true
    }
  }
]

export default routes
