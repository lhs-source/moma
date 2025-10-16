import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/trade',
      name: 'trade',
      component: () => import('../views/trade/index.vue'),
    },
    {
      path: '/cooking',
      name: 'cooking',
      component: () => import('../views/cooking/index.vue'),
    },
    {
      path: '/crafting',
      name: 'crafting',
      component: () => import('../views/crafting/index.vue'),
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('../views/data/index.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/event/index.vue'),
    },
  ],
})

export default router
