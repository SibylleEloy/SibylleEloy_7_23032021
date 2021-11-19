<template>
  <panel title="Commentaires">
     <v-container fluid>
     <v-text-field
            label="Postez votre commentaire ici"
            v-model="texte"
          ></v-text-field>
        </v-container>
     <v-btn
          v-show="isUserLoggedIn"
          dark
          class="black"
          @click="sendMessage">
          Send
        </v-btn>
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
    <!-- <textarea
      readonly
      v-model="message.commentaires"
    >Hello</textarea> -->
  </panel>
</template>

<script>
// les métadonnées
import {mapState} from 'vuex'
// import ArticlesService from '@/services/ArticlesService'
import MessagesService from '@/services/MessagesService'

export default {
  // afficher les messages des articles
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
      'user',
      'isAuthor'
    ])
  },
   // requête au backend pour afficher les messages du user connecté (sans passer ici le userid de la querystring mais le bearer authorization du jwt token)
  // async mounted () {
  //   this.messages = (await MessagesService.index()).data
  // },
  methods: {
    async sendMessage () {
      try {
        this.message = (await MessagesService.post({
          articleId: this.article.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async showMessages () {
      try {
        await MessagesService.index({
          // plus besoin de userid car il est extrait du jwt token du backend
          articleId: this.article.id
        }).data
        // if (messages.length) {
        //   // renvoie le bon bookmark
        //   this.message = messages[0]
        // }
      } catch (err) {
        console.log(err)
      }
    },
    async clearMessage () {
      try {
        // requête delete envoyée au backend
        await MessagesService.delete(this.message.id)
        this.message = null
      } catch (err) {
        console.log(err)
      }
    }

    // async updateArticle () {
    //   if (!this.isAuthor) {
    //     return
    //   }
    //   try {
    //     // requête delete envoyée au backend
    //     await ArticlesService.put(this.article.id)
    //     this.article = null
    //      // dès qu'on est loggé, on est redirigé avec la page articles
    //     this.$router.push({
    //       name: 'articles'
    //     })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
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
