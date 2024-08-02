import { createRouter, createWebHistory } from 'vue-router'
import walkthrough from '../pages/walkthrough/walkthrough'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'walkthrough',
      component: walkthrough
    },
    {
      path: '/signUp',
      name: 'signUp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/signUp&signIn/signUp'),
      meta: { keepAlive: true }
    },
    {
      path: '/verificationCode',
      name: 'verificationCode',
      component: () => import('../pages/signUp&signIn/verificationCode')
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('../pages/signUp&signIn/signIn')
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: () => import('../pages/signUp&signIn/resetPwd')
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('../pages/location/location')
    },
    {
      path: '/select_location',
      name: 'selectLocation',
      component: () => import('../pages/location/selectLocation')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home/home')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/user/user.vue')
    },
    {
      path: '/editUser',
      name: 'editUser',
      component: () => import('../pages/user/editUser.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../pages/order/order_upcoming')
    }
  ]
})

export default router
