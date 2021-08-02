import { createRouter, createWebHistory } from 'vue-router';
import GetTopGames from '../views/GetTopGames';
import GetTopStreamers from '../views/GetTopStreamers';

const routes = [
  {
    path: '/',
    name: 'GetTopGames',
    component: GetTopGames,
  },
  {
    path: '/GetTopStreamers',
    name: 'GetTopStreamers',
    component: GetTopStreamers,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
