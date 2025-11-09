// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryDetailView from '../views/CategoryDetailView.vue'
import ArticleView from '../views/ArticleView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:categorySlug',  // Just the category slug
    name: 'category-detail',
    component: CategoryDetailView,
  },
  {
    path: '/:categorySlug/:articleSlug',  // Category + article slug
    name: 'article',
    component: ArticleView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router