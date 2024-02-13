import { createRouter, createWebHistory } from 'vue-router';
import { userStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: userStore.isLoggedIn ? 'dashboard' : 'login'
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { forVisitors: true }
    },

    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('../views/SignUp.vue'),
      meta: { forVisitors: true }
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { forAuth: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.forAuth) {
    if (userStore.isLoggedIn) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else if (to.meta.forVisitors) {
    if (!userStore.isLoggedIn) {
      next();
    } else {
      next({ path: '/dashboard' });
    }
  }
});

export default router;
