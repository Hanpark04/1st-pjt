<template>
  <div class="d-flex row justify-content-center mx-4 mt-3" style="width: auto;">
    <movie-list-item v-for="movie in items" :key="movie.id" :movie="movie" class="col-3 px-1" >
    </movie-list-item>
    <b-pagination style="background-color: #ADA8BE;" v-model="currentPage" :total-rows="totalRows" align="center" @page-click="pageClick"></b-pagination>

  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import MovieListItem from '../components/MovieListItem.vue'
export default {
  name: 'MovieListView',
  components: { MovieListItem, },
  data() {
      return {
        totalRows: 1,
        currentPage: 1,
        items: [],
      }
    },
  async created() {
    this.items = this.movieList.slice(0,12)
    this.totalRows = this.movieList.length
  },
  methods: {
    ...mapActions(['getMovieList']),
    scrollBehavior () {
      return { x: 0, y: 0 }
    },
    pageClick: function (button, page) {
      this.currentPage = page
      this.items = this.movieList.slice((this.currentPage-1)*12, (this.currentPage)*12)
      this.scrollBehavior()
    }
  },
  computed: {
    ...mapGetters(['movieList']),
  },
}
</script>

<style>

</style>