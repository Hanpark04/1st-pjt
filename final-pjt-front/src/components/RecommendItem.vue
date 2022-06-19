<template>
  <div>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : movie.movie_id, movie: movie} }" class="text-decoration-none">
      <div>
        <b-card
          :title="movie.title"
          :img-src="movie.poster_path"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 border-0"
          style="background-color: black;"
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
  name: "RecommendItem",
  props: {
    movie: Object,
  },
}
</script>

<style>
</style>