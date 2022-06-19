<template>
  <div class="mt-3" style="color: #E0FBFC;">
    <div v-if="items.length===0" style="height: 1000px;">
      <h1 class="text-center">검색결과가 없습니다</h1>
    </div>
    <div v-else>
      <h1 class="text-center">{{items.length}}개의 영화가 검색되었습니다</h1>
      <div class="d-flex flex-column justify-content-center mx-4 mt-3">
        <search-item v-for="movie in search" :key="movie.id" :movie="movie" class="px-0">
        </search-item>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SearchItem from '../components/SearchItem.vue'
export default {
  components: { SearchItem },
  name: 'SearchView',
  computed: {
    ...mapGetters(['search']),
  },
  data () {
    return {
      items: [],
    }
  },
  created () {
    this.items = this.search.slice()
  }
}
</script>

<style>

</style>