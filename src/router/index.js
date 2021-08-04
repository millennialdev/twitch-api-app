import { createRouter, createWebHistory } from 'vue-router';
import GetTopGames from '../views/GetTopGames';
import GetTopStreamers from '../views/GetTopStreamers';
import StreamersForGame from '../views/StreamersForGame';
import Streamer from '../views/Streamer';

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
  {
    path: '/StreamersForGame/:game_name',
    name: 'StreamersForGame',
    component: StreamersForGame,
  },
  {
    path: '/streamer/:streamer_user_name',
    name: 'Streamer',
    component: Streamer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
