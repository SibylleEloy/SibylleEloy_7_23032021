<template>
  <panel title="Extrait">
    <textarea
      readonly
      v-model="article.texte"
    ></textarea>
  </panel>
</template>



<script>
// afficher les textes des articles
export default {
  props: [
    'article'
  ]
}
</script>

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 100%;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
