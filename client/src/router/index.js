import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Articles from '@/components/Articles/Index'
import CreateArticle from '@/components/CreateArticle'
import EditArticle from '@/components/EditArticle'
import ViewArticle from '@/components/ViewArticle/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/articles/create',
      name: 'articles-create',
      component: CreateArticle
    },
    {
      path: '/articles/:articleId',
      name: 'article',
      component: ViewArticle
    },
    {
      path: '/articles/:articleId/edit',
      name: 'article-edit',
      component: EditArticle
    },
    {
      path: '/articles/:articleId/delete',
      name: 'article-edit',
      component: EditArticle
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      // page par défaut
      path: '*',
      redirect: 'articles'
    }
  ]
})
