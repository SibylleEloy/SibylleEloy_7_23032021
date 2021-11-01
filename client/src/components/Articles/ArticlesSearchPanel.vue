<template>
  <panel title="Recherche">
    <v-text-field
      label="Cherchez par titre d'article, auteur ou source"
      v-model="search"
    ></v-text-field>
  </panel>
</template>

<script>
// librairie lodash pour la search methode debounce
import _ from 'lodash'

export default {
  data () {
    return {
      search: ''
    }
  },
  // pour la barre de recherche search avec une querystring qui est stockée, bookmarkée et partagée
  watch: {
    // methode debounce qui optimise la recherche
    search: _.debounce(async function (value) {
      // change avec une nouvelle route
      const route = {
        name: 'articles'
      }
      // si la querystring n'est pas vide
      if (this.search !== '') {
        // change la querystring
        route.query = {
          search: this.search
        }
      }
      // change la route
      this.$router.push(route)
    }, 700),
    // la querystring n'est modifiée que s'il la barre de recherche est remplie
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style>

</style>
