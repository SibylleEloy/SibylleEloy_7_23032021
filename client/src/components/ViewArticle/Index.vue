<template>
  <v-container>
    <v-layout wrap>
      <v-layout wrap>
        <v-flex xs12>
          <article-metadata :article="article" />
        </v-flex>
        <v-flex xs12 class="mt-2">
          <texte :article="article" />
        </v-flex>
      </v-layout>
        <v-flex xs12 class="mt-2">
          <lien :article="article" />
        </v-flex>
      </v-layout>
      <v-flex xs12 class="mt-2">
        <commentaires :message="message" />
      </v-flex>
   
   </v-container>
</template>

<script>
import {mapState} from 'vuex'
// import Tab from './Tab'
import ArticleMetadata from './ArticleMetadata'
import Texte from './Texte'
import Lien from './Lien'
import ArticlesService from '@/services/ArticlesService'
import ArticleHistoryService from '@/services/ArticleHistoryService'
import Commentaires from './Commentaires'
// import MessagesService from './services/MessagesServices'

// fetching les articles
export default {
  data () {
    return {
      article: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const articleId = this.route.params.articleId
    this.article = (await ArticlesService.show(articleId)).data

    if (this.isUserLoggedIn) {
      // dès que l'utilisateur est sur la page ViewArticle, une requête post est faite à l'HistoryService pour afficher les articles vus par cet utilisateur
      ArticleHistoryService.post({
        articleId: articleId
        // on ne passe pas le userid car autorisation avec jwt token
      })
    }
  },
  components: {
    ArticleMetadata,
    Texte,
    Lien,
    Commentaires
  }
}
</script>

<style scoped>
</style>
