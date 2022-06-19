import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

export default {
  state: {
    token: localStorage.getItem('token') || '',
    currentUser: {},
    profile: {},
    authError: null,
    checkFollow: true,
  },
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.currentUser,
    profile: state => state.profile,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: `Token ${state.token}`}),
    checkFollow: state => state.checkFollow,
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
    SET_CHECK_FOLLOW: (state, checkfollow) => state.checkFollow = checkfollow,
  },
  actions: {
    saveToken ({commit}, token) {
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },
    removeToken ({ commit }) {
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },
    login ({commit, dispatch}, user) {
      axios({
        url: drf.accounts.login(),
        method: 'post',
        data: user
      })
      .then(res => {
        const token = res.data.key
        dispatch('saveToken', token)
        dispatch('fetchCurrentUser')
        router.push({ name: 'home' })
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    logout ({ getters, dispatch }) {
      axios({
        url: drf.accounts.logout(),
        method: 'post',
        headers: getters.authHeader,
      })
      .then(() => {
        dispatch('removeToken')
        dispatch('removeCurrentUser')
        alert('성공적으로 로그아웃 했습니다')
        router.push({ name: 'home' })
      })
      .error(err => {
        console.error(err.response)
      })
    },
    signup ({ commit, dispatch }, user) {
      axios({
        url: drf.accounts.signup(),
        method: 'post',
        data: user,
      })
      .then(res => {
        const token = res.data.key
        dispatch('saveToken', token)
        dispatch('fetchCurrentUser')
        router.push({ name: 'home' })
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    passwordChange ({ commit, getters }, user) {
      axios({
        url: drf.accounts.password(),
        method: 'post',
        data: user,
        headers: getters.authHeader,
      })
      .then(res => {
        alert(res.data.detail)
        router.push({ name: 'home' })
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    fetchCurrentUser ({ commit, getters, dispatch }) {
      if (getters.isLoggedIn) {
        axios({
          url: drf.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader,
        })
        .then (res => commit('SET_CURRENT_USER', res.data))
        .catch(err => {
          if (err.response.status === 401) {
            dispatch('removeToken')
            router.push({ name: 'login' })
          }
        })
      }
    },
    removeCurrentUser ({ commit, getters }) {
      if (!getters.isLoggedIn) {
        commit('SET_CURRENT_USER', '')
      }
    },
    fetchProfile ({ commit, getters }, username) {
      axios({
        url: drf.accounts.profile(username),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_PROFILE', res.data)
      })
    },
    follow ({ commit, getters, dispatch },  username ) {
      axios({
        url: drf.accounts.follow(username),
        method: 'post',
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_CHECK_FOLLOW', res.data.isFollow)
        dispatch('fetchProfile', username)
      })
    },
    getFollow({commit, dispatch, getters}, username) {
      axios({
        url: drf.accounts.getfollow(username),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_CHECK_FOLLOW', res.data.isFollow)
        dispatch('fetchProfile', username)
      })
    }
  },
  modules: {
  }
}
