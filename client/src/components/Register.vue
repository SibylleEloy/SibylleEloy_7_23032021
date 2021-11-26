<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="S'enregistrer">
        <form 
          name="form"
          autocomplete="off">
          <v-text-field
            label="Prénom"
            v-model="firstname"
          ></v-text-field>
          <br>
          <v-text-field
            label="Nom"
            v-model="lastname"
          ></v-text-field>
          <br>
          <v-text-field
            label="Identifiant"
            v-model="username"
          ></v-text-field>
          <br>
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Mot de passe"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
          <br>
          <v-select
            ref="role"
            v-model="role"
            :rules="[() => !!role || 'This field is required']"
            :items="roles"
            label="Status"
            placeholder="Veuillez sélectionner..."
            required
          ></v-select>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="red accent-2"
          @click="register">
          S'enregistrer
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data: () => ({
    roles: ['Administrateur', 'Employe'],
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    error: null,
    role: null
  }),

  computed: {
    form () {
      return {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.roles
      }
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          role: this.role
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
