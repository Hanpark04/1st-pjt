<template>
  <div style="color: #E0FBFC;">
    <h1>영화 제목 : {{movie.title}}</h1>
    <form @submit.prevent="createArticle(article)" class="my-1">
      <div>
        <label for="title">제목:</label>
        <b-form-input
          id="title"
          v-model="article.title"
          :state="nameState"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Enter Title"
          trim
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">
          Enter at least 3 letters
        </b-form-invalid-feedback>
      </div>
      <div class="mb-3">
        <label for="content">내용:</label>
        <b-form-textarea
          id="content"
          v-model="article.content"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>
      <b-button type="submit" style="background-color: #ADA8BE;">글 작성</b-button>
    </form>
    <b-button @click="goBack" style="background-color: #A28497;">뒤로 가기</b-button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'ArticleFormView',
  data () {
    return {
      article: {
        title: '',
        content: '',
        movie_id: '',
      },
    }
  },
  methods: {
    ...mapActions(['createArticle']),
    goBack () {
      this.$router.back()
    },
  },
  computed: {
    ...mapGetters(['movie']),
    nameState() {
        return this.article.title.length > 2 ? true : false
    },
  },
  created() {
    this.movie
    this.article.movie_id = this.movie.movie_id
  }
}
</script>

<style>

</style>