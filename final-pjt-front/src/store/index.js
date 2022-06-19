import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts'
import movies from './modules/movies'
import articles from './modules/articles'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { accounts, movies, articles },
  plugins: [
    createPersistedState({
      paths: ['movies', 'accounts', 'articles'],
    })
  ]
})
