<template>
  <div class="pb-3 d-flex justify-content-between">
    <router-link :to="{name : 'profile', params:{username:comment.username[0].username} }" class="text-decoration-none col-4">
      작성자 : {{comment.username[0].username}}
    </router-link>
    <div class="col-4">
      {{comment.content}}
    </div>
    <div class="col-4">
      <b-button style="background-color: #A28497;" @click="deleteComment(comment)" v-if="currentUser.pk === comment.user_id">삭제</b-button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "ArticleListItem",
  props: {
    comment: Object,
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
    ...mapActions(['deleteComment'])
  }
}
</script>

<style>

</style>