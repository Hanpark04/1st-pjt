<template>
  <div style="width: 80%; margin-left:5%; color: #E0FBFC;">
    <h1 class="mt-3 d-flex justify-content-between">
      <span>제목 : {{article.title}}</span>
      <span>영화 : {{movie.title}}</span>    
    </h1>
    <hr>
    <div class="border border-5 rounded" style="height: 300px;">
      <h2>내용</h2>
      <p>{{article.content}}</p>
    </div>
    <div class="mt-3">
      <b-button v-if="currentUser.pk === article.user_id" style="background-color: #ADA8BE;" :to="{ name:'updateform', params: { articleid : article.id} }">수정</b-button>
      <b-button @click="deleteArticle(article, movie)" style="background-color: #A28497;" v-if="currentUser.pk === article.user_id" class="mx-1">삭제</b-button>
      <b-button @click="goBack" style="background-color: #A28497;">뒤로 가기</b-button>
    </div>
    <hr>
    <b-form @submit.prevent="submitComment(comment)" style="width: 800px;">
      <div>
        <label for="content">댓글 : </label>
        <b-form-input v-model="comment.content" type="text" id="content"></b-form-input>
        <b-button type="submit" class="my-3" style="background-color: #ADA8BE;">제출</b-button>
      </div>
    </b-form>
    <comment-list-item v-for="comment in commentList" :key="comment.pk" :comment="comment">
    </comment-list-item>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CommentListItem from '../components/CommentListItem.vue'
export default {
  components: { CommentListItem },
  name: 'ArticleDetailView',
  data () {
    return {
      article : this.$route.params.article,
      comment : {
        content : '',
        article_id : '',
      }
    }
  },
  computed: {
    ...mapGetters(['movie', 'currentUser', 'getarticle', 'isArticle', 'commentList'])
  },
  methods: {
    ...mapActions(['setArticle', 'submitComment', 'getCommentList']),
    goBack () {
      this.$router.back()
    },
  },
  async created() {
    if (this.article === undefined) {
      this.article = this.getarticle
    } 
    await this.setArticle(this.article)
    this.getCommentList(this.getarticle)
    this.comment.article_id = this.article.id
  },
}
</script>

<style>

</style>