<template>
  <panel title="Favoris">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{props.item.titre}}
        </td>
        <td class="text-xs-right">
          {{props.item.username}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

// fait des requêtes au backend pour vérifier quels bookmarks sont associés au user et à quel article
export default {
  data () {
    return {
      headers: [
        {
          text: 'Titre',
          value: 'titre'
        },
        {
          text: 'Posté par',
          value: 'username'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  // requête au backend pour afficher les bookmarks du user connecté (sans passer ici le userid de la querystring mais le bearer authorization du jwt token)
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
  }
}
</script>

<style>

</style>
