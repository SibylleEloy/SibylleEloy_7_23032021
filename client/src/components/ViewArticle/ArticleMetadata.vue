<template>
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
          class="black"
          @click="setAsBookmark">
          Mettre favori
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && bookmark"
          dark
          class="black"
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
          v-show="isUserLoggedIn && isAuthor"
          dark
          class="black"
          @click="deleteArticle">
          Supprimer
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="source-image" :src="article.sourceImageUrl" />
      </v-flex>
    </v-layout>
  </panel>
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
      message: null,
      value: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'isAuthor'
    ])
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
        await MessagesService.index({
          articleId: this.article.id
        }).data
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
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
         // dès qu'on est loggé, on est redirigé avec la page articles
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
          articleId: this.article.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async showMessages () {
      try {
         // requête delete envoyée au backend
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
</style>
