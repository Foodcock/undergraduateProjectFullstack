import { createRouter, createWebHistory } from 'vue-router'
// import AddPage from '../views/AddPage.vue'
import CartPage from '../views/CartPage.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import PayPage from '../views/PayPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import StorePage from '../views/StorePage.vue'
import MerchantPage from '../views/MerchantPage.vue'
import MemberDetail from '../views/MemberDetail.vue'
import DetailPage from '../views/DetailPage.vue'
import test from '../views/test.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const routes = [
  // {
  //   path: '/add',
  //   name: 'add',
  //   component: AddPage
  // }, 
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  }, {
    path: '/home',
    name: 'home',
    component: HomePage
  }, {
    path: '/login',
    name: 'login',
    component: LoginPage
  }, {
    path: '/pay',
    name: 'pay',
    component: PayPage
  }, {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }, {
    path: '/store/:storeName',
    name: 'store',
    component: StorePage
  }, {
    path: '/merchant',
    name: 'merchant',
    component: MerchantPage
  }, {
    path: '/memberDetail',
    name: 'memberDetail',
    component: MemberDetail
  }, {
    path: '/details',
    name: 'detail',
    component: DetailPage
  }, {
    path: '/test',
    name: 'test',
    component: test
  }, {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
