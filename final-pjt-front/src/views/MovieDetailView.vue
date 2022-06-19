<template v-if="isArticleList">
  <div style="color: #E0FBFC;">
    <div class="d-flex flex-row">
      <img :src="movie.poster_path" alt="">
      <div class="mx-1">
        <div>
          <h1>{{movie.title}}</h1>
        </div>
        <div>
          {{movie.overview}}
        </div>
        <p>관객 수 : {{movie.popularity}}</p>
        <p>평점 : {{movie.vote_average}}</p>
        <p>개봉일 : {{movie.release_date}}</p>
        <b-button @click="goBack" style="background-color: #ADA8BE;" class="mx-1">뒤로 가기</b-button>
        <b-button @click="likeMovie(movie)" v-if="movieLike.is_like && isLoggedIn" style="background-color: #A28497;">좋아요 취소</b-button>
        <b-button @click="likeMovie(movie)" v-if="!movieLike.is_like && isLoggedIn" style="background-color: #ADA8BE;">좋아요</b-button>
        <p>좋아요 수 : {{movieLike.likes_count}}</p>
        <div class="iframebox">
          <iframe :src="videoURI" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <div v-if="isLoggedIn">
      <h2 class="text-center">후기</h2>
      <b-button :to="{ name: 'articleform', params:{movieid: movie.movie_id } }" style="background-color: #ADA8BE;">후기 작성</b-button>
      <hr>
      <div class="mt-3 mx-3 pb-3">
        <article-list-item v-for="article in articlelist" :key="article.id" :article="article" :movie="movie" class="row">
        </article-list-item>
      </div>
    </div>
    <div v-else>
      <h2 class="text-center my-0">후기를 보려면 로그인이 필요합니다</h2>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
import ArticleListItem from '../components/ArticleListItem.vue'
const API_URL = 'https://www.googleapis.com/youtube/v3/search'
const API_KEY = 'AIzaSyALHCgZKh_WIh3owFRKnevgvhzIm44J4jA'
export default {
  components: { ArticleListItem },
  name: "MovieDetail",
  methods: {
    ...mapActions(['setMovie', 'setArticleList', 'likeMovie', 'getLike','setLike', 'onlygetLike']),
    goBack () {
      this.$router.back()
      this.setMovie('')
    },
  },
  computed: {
    ...mapGetters(['movie', 'currentUser', 'articleList', 'isArticleList', 'movieLike', 'isLoggedIn']),
  },
  data () {
    return {
      videos: [],
      videoURI: '',
      articlelist: [],
    }
  },
  async created () {
    this.articlelist = []
    await this.setMovie(this.$route.params.movie||this.movie)
    if (this.isLoggedIn) {
      await this.getLike(this.movie)
    }
    else {
      await this.onlygetLike(this.movie)
    }
    await this.setArticleList(this.movie.movie_id)
    this.articlelist = this.articleList
    const params = {
      key: API_KEY,
      part: 'snippet',
      type: 'video',
      q: this.$route.params.movie.title + '예고편'
    }
    await axios({
      method: 'get',
      url : API_URL,
      params
    })
    .then(res => {
      this.videos = res.data.items[0]
      const videoId = this.videos.id.videoId
      this.videoURI = `https://www.youtube.com/embed/${videoId}`
    })
  },
}
</script>

<style>
.iframebox {
  height : 600px;
}
iframe {
  width:100%;
  height:100%;
}
</style>