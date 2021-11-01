<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <articles-bookmarks />
      <recently-viewed-articles class="mt-2" />
    </v-flex>

    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }" class="ml-2">
      <articles-search-panel />
      <articles-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import ArticlesPanel from './ArticlesPanel'
import ArticlesBookmarks from './ArticlesBookmarks'
import RecentlyViewedArticles from './RecentlyViewedArticles'
import ArticlesSearchPanel from './ArticlesSearchPanel'
import ArticlesService from '@/services/ArticlesService'
import {mapState} from 'vuex'

export default {
  components: {
    ArticlesPanel,
    ArticlesSearchPanel,
    ArticlesBookmarks,
    RecentlyViewedArticles
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
