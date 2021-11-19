<template>
  <v-container>
    <v-layout wrap>
      <v-layout>
        <v-flex xs6 v-if="isUserLoggedIn">
          <articles-bookmarks />
        </v-flex>
        <v-flex xs6 v-if="isUserLoggedIn">
          <recently-viewed-articles class="ml-2" />
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 v-if="isUserLoggedIn">
          <articles-comments class="mt-2"/>
        </v-flex>
      </v-layout>


      <v-flex :class="{
          xs12: !isUserLoggedIn,
          xs12: isUserLoggedIn
        }" class="mt-2">
        <articles-search-panel />
        <articles-panel class="mt-2" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticlesPanel from './ArticlesPanel'
import ArticlesBookmarks from './ArticlesBookmarks'
import RecentlyViewedArticles from './RecentlyViewedArticles'
import ArticlesComments from './ArticlesComments'
import ArticlesSearchPanel from './ArticlesSearchPanel'
import ArticlesService from '@/services/ArticlesService'
import {mapState} from 'vuex'

export default {
  components: {
    ArticlesPanel,
    ArticlesSearchPanel,
    ArticlesBookmarks,
    RecentlyViewedArticles,
    ArticlesComments
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      articles: null
    }
  },
  async mounted () {
    this.articles = (await ArticlesService.index()).data
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
  font-size: 22px;
}

.article-source {
  font-size: 18px;
}

.source-image {
  width: 70%;
  margin: 0 auto;
}
</style>
