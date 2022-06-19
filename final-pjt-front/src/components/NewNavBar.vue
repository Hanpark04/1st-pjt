<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background-color: #553555;">
      <b-navbar-brand :to="{name:'home'}">G8tcha!</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
         <b-navbar-nav>
          <b-nav-item :to="{name:'movielist'}">영화</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item @click="recommendClick">영화 추천</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="searchClick(search)">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search.search_word"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" style="background-color: #ADA8BE;">Search</b-button>
          </b-nav-form>
          <b-navbar-nav>
            <b-nav-item :to="{name:'home'}">Home</b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{username}}</em>
            </template>
            <div v-if="!isLoggedIn">
              <b-dropdown-item :to="{ name: 'login' }">Login</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'signup'}">Signup</b-dropdown-item>
            </div>
            <div v-if="isLoggedIn">
              <b-dropdown-item :to="{ name: 'profile', params: {username} }">Profile</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'logout'}">Logout</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'password'}">Change Password</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
    username() {
      return this.currentUser.username ? this.currentUser.username : 'guest'
    },
  },
  methods: {
    ...mapActions(['recommend', 'searchClick']),
    recommendClick () {
      if (this.isLoggedIn) {
        this.recommend()
      }
      else {
        alert('로그인이 필요합니다')
      }
    },
  },
  data () {
    return {
      search: {
        search_word : '',
      },
    }
  }
}
</script>

<style>

</style>