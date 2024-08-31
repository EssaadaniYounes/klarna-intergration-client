import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue') 
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: () => import('../views/ThankYouView.vue')
    }
  ]
})

export default router
