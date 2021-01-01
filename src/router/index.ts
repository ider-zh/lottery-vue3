import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegister.vue'),
  },
  {
    path: '/doubleballaward',
    name: 'doubleballaward',
    component: () => import('@/views/lotto/DoubleBallAward.vue'),
  },
  {
    path: '/doubleball',
    name: 'doubleball',
    component: () => import('@/views/lotto/DoubleBall.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginRegister.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
