<template>
  <panel title="Lien">
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
