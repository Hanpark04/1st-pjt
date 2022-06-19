import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import MovieListView from '../views/MovieListView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import ArticleFormView from '../views/ArticleFormView.vue'
import ArticleUpdateView from '../views/ArticleUpdateView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import RecommendView from '../views/RecommendView.vue'
import SearchView from '../views/SearchView.vue'
import PasswordChangeView from '../views/PasswordChangeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/movielist',
    name: 'movielist',
    component: MovieListView
  },
  {
    path: '/moviedetail/:movieid',
    name: 'moviedetail',
    component: MovieDetailView
  },
  {
    path: '/moviearticle/:movieid',
    name: 'articleform',
    component: ArticleFormView
  },
  {
    path: '/articleupdate/:articleid',
    name: 'updateform',
    component: ArticleUpdateView
  },
  {
    path: '/articledetail/:articleid',
    name: 'articledetail',
    component: ArticleDetailView
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: RecommendView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/password',
    name: 'password',
    component: PasswordChangeView
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
