<template>
<!-- panel qui contient toutes les informations reliées aux articles
qui fetch les articles de la db/backend et le affiche (plutôt que depuis l'Index.vue) -->
  <panel title="Articles">
    <v-btn
      slot="action"
      :to="{
        name: 'articles-create'
      }"
      class="white"
      light
      medium
      absolute
      right
      middle
      fab>
      <v-icon>add</v-icon>
    </v-btn>

    <div 
      v-for="article in articles"
      class="article"
      :key="article.id">

      <v-layout>
        <v-flex xs6>
          <div class="article-titre">
            {{article.titre}}
          </div>
          <div class="article-source">
            posté par {{article.username}}
          </div>
          <br>
          <v-btn
            dark
            class="red accent-2"
            :to="{
              name: 'article', 
              params: {
                articleId: article.id
              }
            }">
            Voir
          </v-btn>
        </v-flex>

        <v-flex xs6>
          <img class="source-image" :src="article.file" />
          <br>
          {{ article.source }}
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import ArticlesService from '@/services/ArticlesService'

export default {
  data () {
    return {
      articles: null
    }
  },
  watch: {
    // écoute la querystring
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        // fetch les articles recherchés
        this.articles = (await ArticlesService.index(value)).data
      }
    }
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
  font-size: 28px;
}

.article-auteur {
  font-size: 16px;
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
