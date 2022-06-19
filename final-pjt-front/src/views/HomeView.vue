<template>
  <div>
    <b-carousel
      id="carousel-1"
      :interval="3000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : items[0].movie_id, movie: items[0]} }" class="text-decoration-none">
      <b-carousel-slide
          :caption="items[0].title"
          :img-src="items[0].poster_path"
        ></b-carousel-slide>
    </router-link>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : items[1].movie_id, movie: items[1]} }" class="text-decoration-none">
      <b-carousel-slide
          :caption="items[1].title"
          :img-src="items[1].poster_path"
        ></b-carousel-slide>
    </router-link>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : items[2].movie_id, movie: items[2]} }" class="text-decoration-none">
      <b-carousel-slide
          :caption="items[2].title"
          :img-src="items[2].poster_path"
        ></b-carousel-slide>
    </router-link>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : items[3].movie_id, movie: items[3]} }" class="text-decoration-none">
      <b-carousel-slide
          :caption="items[3].title"
          :img-src="items[3].poster_path"
        ></b-carousel-slide>
    </router-link>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : items[4].movie_id, movie: items[4]} }" class="text-decoration-none">
      <b-carousel-slide
          :caption="items[4].title"
          :img-src="items[4].poster_path"
        ></b-carousel-slide>
    </router-link>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : items[5].movie_id, movie: items[5]} }" class="text-decoration-none">
      <b-carousel-slide
          :caption="items[5].title"
          :img-src="items[5].poster_path"
        ></b-carousel-slide>
    </router-link>
    </b-carousel>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "HomeView",
  data() {
    return {
      items: [],
      videos: [],
      sliding: true,
    }
  },
  methods: {
    ...mapActions(['getMovieList']),
     onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = true
      },
  },
  computed:{
    ...mapGetters(['movieList', 'isMovieList'])
  },
  async mounted() {
    if (!this.isMovieList) {
      await this.getMovieList()
    }
    this.items = this.movieList.slice(0,6)
  }
}
</script>

<style>

</style>