<template>
  <panel title="Messages">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="messages">
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
import MessagesService from '@/services/MessagesService'

// fait des requêtes au backend pour vérifier quels messagess sont associés au user et à quel article
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
      messages: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  // requête au backend pour afficher les messages du user connecté (sans passer ici le userid de la querystring mais le bearer authorization du jwt token)
  async mounted () {
    if (this.isUserLoggedIn) {
      this.messages = (await MessagesService.index()).data
    }
  }
}
</script>

<style>

</style>
