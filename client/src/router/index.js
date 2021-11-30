import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Articles from '@/components/Articles/Index'
import CreateArticle from '@/components/CreateArticle'
import EditArticle from '@/components/EditArticle'
import ViewArticle from '@/components/ViewArticle/Index'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
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
      path: '/',
      name: 'login',
      component: Login
    },
    {
      // page par défaut
      path: '*',
      redirect: 'articles'
    }
  ]
})

// Implementing .beforeEach() hook on router instance:
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !store.state.isUserLoggedIn) next({ name: 'Login' })
  else next()
  // console.log(store.state.isUserLoggedIn)
})

// exporting the instance
export default router
