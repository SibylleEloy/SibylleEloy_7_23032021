<template>
  <v-toolbar fixed class="black" dark>
      
    <v-toolbar-title class="mr-4">
      <router-link 
        class="home"
        tag="span"
        :to="{
          name: 'articles'
        }">
        <img src="../assets/Groupomania_Logos/icon-left-font-monochrome-white.png" height="200px" width="200px">
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
      v-if="$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'articles'
        }">
        Actualités
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>
      
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'register'
        }">
        Sign Up
      </v-btn>

       <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'profile'
        }"
    >
      <v-icon>account_circle</v-icon>
    </v-btn>
      
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        flat 
        dark
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'articles'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

/* .home:hover {
  color: #E9E;
} */
</style>
