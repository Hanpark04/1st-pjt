<template>
  <div style="color: #E0FBFC;">
    <h1>
      Signup
    </h1>
    <b-form @submit.prevent="signup(user)" style="width: 800px;">
      <div>
        <label for="username">아이디 : </label>
        <b-form-input v-model="user.username" type="text" id="username"></b-form-input>
      </div>
      <div>
        <label for="email">이메일 : </label>
        <b-form-input v-model="user.email" type="email" id="email"></b-form-input>
      </div>
      <div>
        <label for="password1">비밀번호 : </label>
        <b-form-input v-model="user.password1" type="password" id="password1"></b-form-input>
      </div>
      <div class="mb-3">
        <label for="password2">비밀번호 확인 : </label>
        <b-form-input v-model="user.password2" type="password" id="password2"></b-form-input>
      </div>
      <b-button type="submit" style="background-color: #ADA8BE;">회원가입</b-button>
    </b-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'SignupView',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password1: '',
        password2: '',
      }
    }
  },
  methods: {
    ...mapActions(['signup'])
  }
}
</script>

<style>

</style>