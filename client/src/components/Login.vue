<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
        <br>
        <v-text-field
          label="Mot de passe"
          type="password"
          v-model="password"
        ></v-text-field>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="red accent-2"
          @click="login">
          Se connecter
        </v-btn>
      </panel>
      <br>
      <p>Si vous n'avez pas encore de compte :</p>
      <v-btn 
        dark
        class='red accent-1'
        :to="{
          name: 'register'
        }">
        Créer un compte
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
          // dès qu'on est loggé, on est redirigé avec la page articles
        this.$router.push({
          name: 'articles'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
