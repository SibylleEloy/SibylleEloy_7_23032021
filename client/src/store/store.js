// Vuex module
// store file qui dit a Vue d'utiliser Vuex
// création de la store qui gère les "states" de l'application en fonction du user logged in ou non
// quand on se log, on est sur Login.vue, on regarde le response avec username/token,
// on utilise la réponse et on appelle l'action setToken en revenant sur store.js, puis la mutation
import Vue from 'vue'
import Vuex from 'vuex'
// localStorage pour garder les datas de connexion en mémoire à chaque refresh
import createPersistedState from 'vuex-persistedstate'

// store file qui dit à Vue d'utiliser Vuex
Vue.use(Vuex)
Vue.config.devtools = true

// création de la Vuex store
export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    isAuthor: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
      state.isAuthor = !!(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
