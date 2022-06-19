import axios from 'axios'
import drf from '@/api/drf'
// import router from '@/router'
import {mapGetters} from 'vuex'
import router from '@/router'
export default {
  state: {
    articleList : [],
    article : '',
    commentList : [],
  },
  getters: {
    ...mapGetters(['authHeader']),
    articleList : state => state.articleList.sort(function(a,b){
      return a.id - b.id
    }),
    isArticleList: state => !!state.articleList,
    getarticle: state => state.article,
    isArticle: state => !!state.article,
    commentList: state => state.commentList,
  },
  mutations: {
    SET_ARTICLE_LIST: (state, articleList) => state.articleList = articleList,
    SET_ARTICLE: (state, article) => state.article = article,
    SET_COMMENT_LIST: (state, commentList) => state.commentList = commentList,
  },
  actions: {
    createArticle ({commit ,getters}, article) {
      axios({
        url: drf.articles.articlecreate(article.movie_id),
        method: 'post',
        data: article,
        headers: getters.authHeader,
      })
      .then(() => {
        alert('글이 생성됐습니다')
        router.push({name:'moviedetail', params:{movieid:article.movie_id}})
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    async setArticleList ({ commit }, movie_id) {
      await axios({
        url: drf.articles.articlelist(movie_id),
        method: 'get',
      })
      .then(res => {
        commit('SET_ARTICLE_LIST', res.data)
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    updateArticle({ dispatch, getters }, article){
      axios({
        url: drf.articles.articleupdate(article.pk),
        method: 'put',
        data: article,
        headers: getters.authHeader,
      })
        .then(() => {
          dispatch('setArticleList', article.movie_id)
          router.push({
            name: 'moviedetail',
            params: { movieid: article.movie_id }
          })
        })
        .catch(err => console.error(err.response))
    }, 
    deleteArticle({ dispatch, getters }, article) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.articles.articledelete(article.id),
          method: 'delete',
          headers: getters.authHeader,
        })
          .then(() => {
            dispatch('setArticleList', article.movie_id)
            router.go()
          })
          .catch(err => console.error(err.response))
      }
    },
    async getCommentList({commit}, article) {
      await axios({
        method: 'get',
        data: article,
        url: drf.articles.articledetail(article.id)
      })
      .then(res => {
        commit('SET_COMMENT_LIST', res.data.comment_list)
      })
    },
    submitComment({dispatch, getters}, comment) {
      axios({
        method: 'post',
        url: drf.articles.commentcreate(comment.article_id),
        data: comment,
        headers: getters.authHeader,
      })
      .then(() => {
        dispatch('getCommentList', getters.getarticle)
        router.go()
      })
      .catch(err => console.error(err.response))
    },
    deleteComment({dispatch, getters}, comment){
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.articles.commentdelete(comment.id),
          method: 'delete',
          headers: getters.authHeader,
        })
          .then(() => {
            dispatch('getCommentList', getters.getarticle)
          })
          .catch(err => console.error(err.response))
      }
    },
    async setArticle({commit}, article) {
      await commit('SET_ARTICLE', article)
    }
  },
  modules: {
  }
}
