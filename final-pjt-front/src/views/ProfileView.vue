<template>
  <div class="d-flex flex-column align-items-center" style="width:auto; color: #E0FBFC;">
    <div class="d-flex flex-row justify-content-between mt-3" style="width: 90%;">
      <h1 class="my-0">{{profile.username}}님의 프로필</h1>
      <div class="d-flex my-3">
        <h3 class="mx-3">
        팔로우 수 : {{profile.following_count}}
        팔로워 수 : {{profile.follower_count}}
        </h3>
        <div v-if="myname != username">
          <b-button v-if="checkFollow" style="background-color: #A28497;" @click="follow(username)">언팔로우</b-button>
          <b-button v-else style="background-color: #ADA8BE;" @click="follow(username)">팔로우</b-button>
        </div>
      </div>
    </div>
    <h2>{{profile.username}}님이 좋아요한 영화</h2>
    <div class="d-flex row mx-0 px-0 my-1" style="width: 90%">
      <profile-movie-item v-for="movie in profile.movie_likes" :key="movie.id" :movie="movie" class="px-1 mx-0 col-4">
      </profile-movie-item>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProfileMovieItem from '../components/ProfileMovieItem.vue'
export default {
  components: { ProfileMovieItem },
  name: 'ProfileView',
  data () {
    return {
      username: '',
      myname: '',
    }
  },
  async created() {
    this.username = this.$route.params.username
    this.myname = this.currentUser.username
    await this.getFollow(this.username)
    this.fetchProfile(this.username)
    },
  updated() {
    this.isFollow = this.checkFollow
    this.myname = this.currentUser.username
    this.fetchProfile(this.$route.params.username)
  },
  watch () {

  },
  computed: {
    ...mapGetters(['checkFollow', 'profile', 'currentUser']),
  },
  methods: {
    ...mapActions(['follow', 'fetchProfile', 'getFollow',])
  }
}
</script>

<style>

</style>