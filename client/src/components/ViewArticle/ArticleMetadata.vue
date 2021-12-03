<template>
  <div>
  <panel title="Détails de l'article">
    <v-layout>
      <v-flex xs6>
        <div class="article-titre">
          {{article.titre}}
        </div>
        <div class="article-auteur">
          {{article.auteur}}
        </div>
        <div class="article-source">
          {{article.source}}
        </div>
    

        <!-- <v-btn
          dark
          class="black"
          :to="{
            name: 'article-edit', 
            params () {
              return {
                articleId: article.id
              }
            }
          }">
          Sauvegarder
        </v-btn> -->

        <v-btn
          v-if="isUserLoggedIn && !bookmark"
          dark
          class="red accent-2"
          @click="setAsBookmark">
          Mettre en favori
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && bookmark"
          dark
          class="red accent-2"
          @click="unsetAsBookmark">
          Supprimer le favori
        </v-btn>

        <!-- <v-btn
            v-show="isUserLoggedIn && isAuthor"
            dark
            class="black"
            @click="updateArticle">
            Editer
          </v-btn> -->

        <v-btn
          v-if="isUserLoggedIn && isAuthor"
          dark
          class="red accent-2"
          @click="deleteArticle">
          Supprimer
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="source-image" :src="article.file" />
      </v-flex>
    </v-layout>
  </panel>
  <!-- Section Poster un commentaire -->
    <panel title="Commentaires" class="mt-2">
      <form 
          name="form"
          autocomplete="off">
        <v-container fluid>
                <v-text-field
                label="Votre identifiant"
                v-model="username"
              ></v-text-field>
        <v-text-field
                label="Postez votre commentaire ici"
                v-model="comment"
              ></v-text-field>
            </v-container>
      </form>
     <v-btn
          v-if="isUserLoggedIn"
          dark
          class="red accent-2"
          @click="sendMessage">
          Envoyer
        </v-btn>
  <!-- Section Affichage des commentaires -->
        <v-data-table
          :headers="headers"
          :pagination.sync="pagination"
          :items="messages">
          <template slot="items" scope="props">
            <td class="text-xs-right">
              {{props.item.comment}}
            </td>
            <td class="text-xs-right">
              {{props.item.username}}
            <!-- </td>
             <td class="text-xs-right">
              {{props.item.user_id}}
            </td> -->
            <td>
              <v-btn
              v-if="isUserLoggedIn"
              transparent
              class="btn-clear-message"
              @click="clearMessage"
              >
                <v-icon dark>close</v-icon>
              </v-btn>
            </td>
             <!-- <td class="text-xs-right"> -->
            <!-- <v-button  
               <v-icon class="text-xs-right">close-circle-outline</v-icon>  -->
            <!-- </td> -->
          </template>
        </v-data-table>
    <!-- <textarea
      readonly
      v-model="message.commentaires"
    >Hello</textarea> -->
  </panel>
  </div>
</template>

<script>
// les métadonnées
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
import ArticlesService from '@/services/ArticlesService'
import MessagesService from '@/services/MessagesService'

export default {
  props: [
    'article'
  ],
  data () {
    return {
      bookmark: null,
      comment: '',
      username: '',
      user_id: '',
      message: null,
      messages: [],
      headers: [
        {
          text: 'Commentaire',
          value: 'comment'
        },
        {
          text: 'Posté par',
          value: 'username'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    isAuthor () {
      return this.article.user_id.toString() === this.user.id.toString()
    },
    // isAdmin () {
    //   console.log(this.user.role)
    //   return this.user.role === 'Administrateur'
    // },
    form () {
      return {
        username: this.username,
        comment: this.comment
      }
    }
  },
  watch: {
    async article () {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        // appel du BookmarksService avec les params
        const bookmarks = (await BookmarksService.index({
          // plus besoin de userid car il est extrait du jwt token du backend
          articleId: this.article.id
        })).data
        if (bookmarks.length) {
          // renvoie le bon bookmark
          this.bookmark = bookmarks[0]
        }
        // appel du MessagesService avec les params
        this.messages = (await MessagesService.index({
          articleId: this.article.id
        })).data
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    // isAdminOrAuthor (userId) {
    //   if (typeof userId === 'undefined') {
    //     return this.isUserLoggedIn && (this.isAuthor || this.isAdmin)
    //   } else {
    //     return (userId === this.user.id) || this.isAdmin
    //   }
    // },
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          articleId: this.article.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        // requête delete envoyée au backend
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    },
    async deleteArticle () {
      if (!this.isAuthor) {
        return
      }
      try {
        // requête delete envoyée au backend
        await ArticlesService.delete(this.article.id)
        this.article = null
        this.$router.push({
          name: 'articles'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async sendMessage () {
      try {
        this.message = (await MessagesService.post({
          user_id: this.user.id,
          username: this.username,
          comment: this.comment,
          articleId: this.article.id
        })).data
        this.$router.go()
      } catch (err) {
        console.log(err)
      }
    },
    // async showMessages () {
    //   try {
    //      // requête delete envoyée au backend
    //     await MessagesService.index({
    //       // plus besoin de userid car il est extrait du jwt token du backend
    //       articleId: this.article.id
    //     }).data
    //     // if (messages.length) {
    //     //   // renvoie le bon bookmark
    //     //   this.message = messages[0]
    //     // }
    //     this.$router.push({
    //       name: 'articles/articleId'
    //     })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    async clearMessage () {
      try {
        // console.log(messageId)
        await MessagesService.delete({
          user_id: this.user.id
        })
        this.message = null
        this.$router.go()
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
.article {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.article-titre {
  font-size: 30px;
}

.article-auteur {
  font-size: 20px;
  font-style: italic;
}

.article-source {
  font-size: 18px;
}

.source-image {
  width: 70%;
  margin: 0 auto;
}

.btn-clear-message {
  padding: 0;
}

.btn-clear-message {
  min-width: 0;
}
</style>

