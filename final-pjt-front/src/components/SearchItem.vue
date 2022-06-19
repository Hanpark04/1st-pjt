<template>
  <div>
    <router-link
      :to="{ name: 'moviedetail', params: {movieid : movie.movie_id, movie: movie} }" class="text-decoration-none">
      <div>
        <b-card
          :title="movie.title"
          :img-src="movie.poster_path"
          img-alt="Image"
          img-left
          tag="article"
          class="mb-2"
          style="background-color: black;"
        >
          <b-card-text>
            <p>
              {{movie.overview}}
            </p>
            <p>관객 수 : {{movie.popularity}}</p>
            <p>평점 : {{movie.vote_average}}</p>
            <p>개봉일 : {{movie.release_date}}</p>
          </b-card-text>
        </b-card>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    movie: Object,
  },
}
</script>

<style>
</style>