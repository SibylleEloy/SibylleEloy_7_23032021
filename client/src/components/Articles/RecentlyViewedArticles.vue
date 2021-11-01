<template>
  <panel title="Articles vus récemment">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="histories">
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{props.item.titre}}
        </td>
        <td class="text-xs-right">
          {{props.item.source}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import ArticleHistoryService from '@/services/ArticleHistoryService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Titre',
          value: 'titre'
        },
        {
          text: 'Source',
          value: 'source'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      histories: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.histories = (await ArticleHistoryService.index()).data
    }
  }
}
</script>

<style>

</style>
