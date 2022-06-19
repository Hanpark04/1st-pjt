import axios from 'axios'
import drf from '@/api/drf'
// import router from '@/router'
import {mapGetters} from 'vuex'
import router from '@/router'
// import router from '@/router'
export default {
  state: {
    movieList : null,
    movie: {},
    movieLike: {},
    recommend: {},
    search: {},
  },
  getters: {
    ...mapGetters(['authHeader','isLoggedIn']),
    movieList: state => state.movieList,
    movie: state => state.movie,
    movieLike: state => state.movieLike,
    isMovieList: state => !!state.movieList,
    recommend: state => state.recommend,
    search: state => state.search,
  },
  mutations: {
    SET_MOVIE_LIST: (state, movieList) => state.movieList = movieList,
    SET_MOVIE: (state, movie) => state.movie = movie,
    SET_MOVIE_LIKE: (state, like) => state.movieLike = like,
    SET_RECOMMEND: (state, recommend) => {
      state.recommend = recommend
      router.push({name: 'recommend'})
    },
    SET_SEARCH: (state, search) => {
      state.search = search
      router.push({name: 'search'})
      router.go()
    }
  },
  actions: {
    async getMovieList ({ commit }) {
      await axios({
        url: drf.movies.movielist(),
        method: 'get'
      })
      .then(res => {
        commit('SET_MOVIE_LIST', res.data)
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    async setMovie ({ commit }, movie) {
      await commit('SET_MOVIE', movie)
    },
    likeMovie ({ commit, getters }, movie) {
      axios({
        url: drf.movies.movielike(movie.movie_id),
        method: 'post',
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_MOVIE_LIKE', res.data)
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    getLike({commit, getters}, movie) {
      axios({
        method: 'get',
        url: drf.movies.getlike(movie.movie_id),
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_MOVIE_LIKE', res.data)
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    onlygetLike({commit}, movie) {
      axios({
        method: 'get',
        url: drf.movies.onlygetlike(movie.movie_id),
      })
      .then(res => {
        commit('SET_MOVIE_LIKE', res.data)
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    setLike({commit}) {
      commit('SET_MOVIE_LIKE', '')
    },
    recommend({commit, getters}) {
      axios({
        method: 'get',
        url: drf.movies.recommend(),
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_RECOMMEND', res.data)
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    searchClick({commit, getters}, search){
      if (getters.isLoggedIn) {
        axios({
          method: 'post',
          url: drf.movies.search(),
          headers: getters.authHeader,
          data: search,
        })
        .then(res => {
          commit('SET_SEARCH', res.data)
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
      }
      else {
        alert('로그인이 필요합니다')
      }
    },
  },
  modules: {
  }
}
