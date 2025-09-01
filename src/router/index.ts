import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TradeView from '../views/TradeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/trade',
      name: 'trade',
      component: TradeView
    },
    {
      path: '/cooking',
      name: 'cooking',
      component: () => import('../views/CookingSimulatorView.vue'),
    },
    {
      path: '/crafting',
      name: 'crafting',
      component: () => import('../views/CraftingView.vue'),
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('../views/DataView.vue'),
    },
    {
      path: '/gear',
      name: 'gear',
      component: () => import('../views/GearSimulatorView.vue'),
    },
  ],
})

export default router
