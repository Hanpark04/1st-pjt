<template>
  <div class="col-4">
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : movie.movie_id, movie: movie} }" class="text-decoration-none">
      <div class="h-100">
        <b-card
          :img-src="movie.poster_path"
          img-alt="Image"
          img-top
          class="px-0 text-center border-0"
          style="background-color: black;"
        >
        </b-card>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ProfileMovieItem",
  props: {
    movie: Object,
  },
}
</script>

<style>
</style>