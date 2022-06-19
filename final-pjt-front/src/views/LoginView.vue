<template>
  <div style="color: #E0FBFC;">
    <h1>Login</h1>
    <b-form @submit.prevent="login(user)" style="width: 800px;">
      <div>
        <label for="username">아이디: </label>
        <b-form-input v-model="user.username" type="text" id="username" required></b-form-input>
      </div>
      <div class="my-3">
        <label for="password">비밀번호: </label>
        <b-form-input v-model="user.password" type="password" id="password" required></b-form-input>
      </div>
      <b-button type="submit" style="background-color: #ADA8BE;">로그인</b-button>
    </b-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'LoginView',
  data () {
    return {
      user:{
        username: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions(['login'])
  }
}
</script>

<style>

</style>