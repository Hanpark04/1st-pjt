<template>
  <div>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : movie.movie_id, movie: movie} }" class="text-decoration-none">
      <div class="h-100">
        <b-card
          :title="movie.title"
          :img-src="movie.poster_path"
          :to="{ name: 'moviedetail', params: {movieid : movie.movie_id, movie: movie} }"
          img-alt="Image"
          img-top
          class="col-12 px-0 border-0"
          style="background-color : #232020;"
        >
          <b-card-text>
            {{movie.overview}}
          </b-card-text>
        </b-card>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MovieListItem",
  props: {
    movie: Object,
  },
}
</script>

<style>
a {
  color: #E0FBFC;
}
</style>