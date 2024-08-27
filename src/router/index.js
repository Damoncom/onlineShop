import { createRouter, createWebHistory } from 'vue-router'
import walkthrough from '../pages/walkthrough/walkthrough'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // walkthrough页面
    {
      path: '/',
      name: 'walkthrough',
      component: walkthrough
    },
    // signIn  &  signUp 页面
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

    // location页面
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
      path: '/add_location',
      name: 'add_location',
      component: () => import('../pages/location/addLocation')
    },
    {
      path: '/edit_location',
      name: 'edit_location',
      component: () => import('../pages/location/editLocation')
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

    //sideBar页面
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../pages/sideBar/notification')
    },
    {
      path: '/whishlist',
      name: 'whishlist',
      component: () => import('../pages/sideBar/whishlist')
    },
    {
      path: '/payment_history',
      name: 'payment_history',
      component: () => import('../pages/sideBar/payment_history')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../pages/sideBar/setting')
    },

    //setting页面
    {
      path: '/language',
      name: 'language',
      component: () => import('../pages/settingss/language')
    },

    //404页面
    {
      path: '/notFound',
      name: 'notFound',
      component: () => import('@/components/notFound')
    },

    // 测试页面
    {
      path: '/test',
      name: 'test',
      component: () => import('@/pages/Test')
    }
  ]
})

let store = null
let token
// 登录后才挂载user🍍
if (!store) store = useUserStore()
token = store.token
const isRemember_info = store.isRemember
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.name == 'walkthrough' && isRemember_info == true) next({ name: 'home' })
  else next()
})

export default router
