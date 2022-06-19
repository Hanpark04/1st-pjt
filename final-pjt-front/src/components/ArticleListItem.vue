<template>
  <div class="d-flex justify-content-between">
    <router-link :to="{name : 'profile', params:{username:article.username[0].username} }" class="text-decoration-none col-4">
      작성자 : {{article.username[0].username}}
    </router-link>
    <router-link :to="{name : 'articledetail', params:{articleid:article.id, article:article} }" class="text-decoration-none col-4">
      제목 : {{article.title}}
    </router-link>
    <div class="col-4">
      <b-button style="background-color: #ADA8BE;" v-if="currentUser.pk === article.user_id" :to="{ name:'updateform', params: { articleid : article.id} }" class="mx-1">수정</b-button>
      <b-button style="background-color: #A28497;" @click="deleteArticle(article, movie)" v-if="currentUser.pk === article.user_id">삭제</b-button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "ArticleListItem",
  props: {
    article: Object,
    movie: Object,
  },
  data() {
    return {
      deletearticle: this.article
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['deleteArticle'])
  }
}
</script>

<style>

</style>