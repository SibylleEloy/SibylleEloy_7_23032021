<template>
  <panel title="En savoir plus">
   <a v-bind:href="article.lien">
   VISIT WEBSITE
   </a>
  </panel>
</template>

<script>
export default {
  props: [
    'article'
  ]
}
</script>

<style scoped>
</style>
