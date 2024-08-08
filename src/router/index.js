import { createRouter, createWebHistory } from 'vue-router'
import walkthrough from '../pages/walkthrough/walkthrough'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 开屏动画
    {
      path: '/',
      name: 'walkthrough',
      component: walkthrough
    },

    // 登录与注册
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../pages/signUp&signIn/signUp')
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

    // 定位
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

    // Home页面
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home/home')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../pages/home/category')
    },
    {
      path: '/product_details',
      name: 'product_details',
      component: () => import('../pages/home/productDetails')
    },

    // search页面
    {
      path: '/search',
      name: 'search',
      component: () => import('../pages/search/search')
    },

    // cart页面
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/cart/cart')
    },
    {
      path: '/reviewPurchase',
      name: 'reviewPurchase',
      component: () => import('../pages/cart/reviewPurchase')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../pages/cart/payment')
    },
    {
      path: '/done',
      name: 'done',
      component: () => import('../pages/cart/done')
    },

    // order页面
    {
      path: '/order',
      name: 'order',
      component: () => import('../pages/order/order_upcoming')
    },
    {
      path: '/order_history',
      name: 'order_history',
      component: () => import('../pages/order/order_history')
    },
    {
      path: '/order_tracking',
      name: 'order_tracking',
      component: () => import('../pages/order/order_tracking')
    },

    // profile页面
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

    //home_info页面
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../pages/home_info/notification')
    },
    {
      path: '/whishlist',
      name: 'whishlist',
      component: () => import('../pages/home_info/whishlist')
    },
    {
      path: '/payment_history',
      name: 'payment_history',
      component: () => import('../pages/home_info/payment_history')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../pages/home_info/setting')
    },

    //setting页面
    {
      path: '/language',
      name: 'language',
      component: () => import('../pages/settingss/language')
    }
  ]
})

export default router
