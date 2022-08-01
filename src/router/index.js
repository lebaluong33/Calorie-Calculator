import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../views/LoginForm.vue';

const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/login-success',
    name: 'LoginSuccess',
    component: () => import('../views/LoginSuccess.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
