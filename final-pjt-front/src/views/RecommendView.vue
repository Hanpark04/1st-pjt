<template>
  <div class="d-flex row justify-content-center mx-4 mt-3">
    <recommend-item v-for="movie in recommend" :key="movie.id" :movie="movie" class="col-3 px-1">
    </recommend-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import RecommendItem from '../components/RecommendItem.vue'
export default {
  components: { RecommendItem },
  name: 'RecommendView',
  computed: {
    ...mapGetters(['recommend']),
  },
}
</script>

<style>

</style>