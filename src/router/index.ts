import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { requiresAuthGuard } from '../app-setting'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import( '../views/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/:id',
    name: 'edit-user',
    component: () => import( '../views/editUser.vue'),
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

requiresAuthGuard(router)

export default router
