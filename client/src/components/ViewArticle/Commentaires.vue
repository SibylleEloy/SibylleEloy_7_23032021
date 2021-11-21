<template>
  <panel title="Commentaires">
     <v-container fluid>
  
          <v-text-field
            label="Votre identifiant"
            required
            :rules="[required]"
            v-model="message.username"
          ></v-text-field>
          <v-text-field
            label="Postez votre commentaire ici"
            v-model="message.texte"
          ></v-text-field>
       
        </v-container>
          <v-btn
          dark
          class="black"
          @click="createMessage">
          Envoyer
        </v-btn>
        <v-data-table
          :headers="headers"
          :pagination.sync="pagination"
          :items="messages">
          <template slot="items" scope="props">
            <td class="text-xs-right">
              {{props.item.texte}}
            </td>
            <td class="text-xs-right">
              {{props.item.username}}
            </td>
            <td class="text-xs-right">
              {{props.item.source}}
            </td>
          </template>
        </v-data-table>
         <!-- <pre>{{message.username}}</pre> -->
    <!-- <textarea
      readonly
      v-model="message.commentaires"
    >Hello</textarea> -->
  </panel>
</template>

<script>
import MessagesService from '@/services/MessagesService'

export default {
  data () {
    return {
      message: {
        username: null,
        title: null,
        texte: null
      },
      messages: [],
      headers: [
        {
          text: 'Titre',
          value: 'title'
        },
        {
          text: 'Posté par',
          value: 'username'
        },
        {
          text: 'Article',
          value: 'source'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      error: null,
      required: (value) => !!value || 'Obligatoire.'
      // error: null,
      // required: (value) => !!value || 'Obligatoire.'
      // texte: '',
  // computed: {
  //   ...mapState([
  //     'isUserLoggedIn',
  //     'user',
  //     'isAuthor'
  //   ])
    }
  },
  async mounted () {
    this.messages = (await MessagesService.index()).data
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 100%;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
