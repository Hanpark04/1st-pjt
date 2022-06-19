<template>
  <div style="color: #E0FBFC;">
    <h1>
      PasswordChange
    </h1>
    <b-form @submit.prevent="passwordChange(user)" style="width: 800px;">
      <div>
        <label for="new_password1">새 비밀번호 : </label>
        <b-form-input v-model="user.new_password1" type="password" id="new_password1"></b-form-input>
      </div>
      <div class="mb-3">
        <label for="new_password2">새 비밀번호 확인 : </label>
        <b-form-input v-model="user.new_password2" type="password" id="new_password2"></b-form-input>
      </div>
      <b-button type="submit" style="background-color: #ADA8BE;">비밀번호 수정</b-button>
    </b-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'PasswordChangeView',
  data () {
    return {
      user: {
        new_password1: '',
        new_password2: '',
      }
    }
  },
  methods: {
    ...mapActions(['passwordChange'])
  }
}
</script>

<style>

</style>