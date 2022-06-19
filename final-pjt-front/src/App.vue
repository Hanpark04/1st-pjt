<template>
  <div id="app" style="background: black; min-height: 1440px;">
    <new-nav-bar></new-nav-bar>
    <router-view/>
  </div>
</template>
<script>
import NewNavBar from './components/NewNavBar.vue'
  export default {
    mounted() {
      this.$store.dispatch('fetchCurrentUser')
    },
    components: {
        NewNavBar,
    }
  }
</script>
<style>
</style>
