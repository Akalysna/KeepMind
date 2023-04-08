import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThemeView from '../views/Theme/ThemeView.vue'
import CreateThemeView from '../views/Theme/CreateThemeView.vue'
import CreateCardView from '../views/Theme/CreateCardView.vue'
import GameView from '../views/Game/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/theme/:id',
      name: 'theme',
      props:true, 
      component:ThemeView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/create-theme',
      name: 'create-theme',
      component:CreateThemeView
    }, 
    {
      path: '/theme/:id/game',
      name: 'game-view',
      props:true,
      component: GameView
    },
    {
      path: '/theme/:id/cards',
      name: 'cards',
      props:true, 
      component:CreateCardView,
      meta: { transition: 'slide-left' },
    },
  ]
})

export default router
