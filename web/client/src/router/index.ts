import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../modules/home/pages/HomeView.vue';
import LinkView from '../modules/link/pages/LinkView.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/:id',
      component: LinkView,
    },
  ],
});

export default router;
