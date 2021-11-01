<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <article-metadata :article="article" />
      </v-flex>

      <v-flex xs6 class="ml-2">
        <texte :article="article" />
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs6>
        <lien :article="article" />
      </v-flex>

      <!-- <v-flex xs6 class="ml-2">
        <tab :article="article" />
      </v-flex> -->
    </v-layout>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// import Tab from './Tab'
import ArticleMetadata from './ArticleMetadata'
import Texte from './Texte'
import Lien from './Lien'
import ArticlesService from '@/services/ArticlesService'
import ArticleHistoryService from '@/services/ArticleHistoryService'

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
    Lien
  }
}
</script>

<style scoped>
</style>
