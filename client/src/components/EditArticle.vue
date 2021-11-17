<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Détails de l'article">
        <v-text-field
          label="Titre"
          required
          :rules="[required]"
          v-model="article.titre"
        ></v-text-field>

        <v-text-field
          label="Auteur"
          required
          :rules="[required]"
          v-model="article.auteur"
        ></v-text-field>

        <v-text-field
          label="Source"
          required
          :rules="[required]"
          v-model="article.source"
        ></v-text-field>

        <v-text-field
          label="Lien"
          required
          :rules="[required]"
          v-model="article.lien"
        ></v-text-field>

        <v-text-field
          label="Source Image Url"
          required
          :rules="[required]"
          v-model="article.sourceImageUrl"
        ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Résumé de l'article" class="ml-2">
        <v-text-field
          label="Texte"
          multi-line
          required
          :rules="[required]"
          v-model="article.texte"
        ></v-text-field>
      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="black"
        @click="save">
        Enregistrer l'article
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import ArticlesService from '@/services/ArticlesService'

export default {
  data () {
    return {
      article: {
        titre: null,
        auteur: null,
        source: null,
        sourceImageUrl: null,
        lien: null,
        texte: null
      },
      error: null,
      required: (value) => !!value || 'Obligatoire.'
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.article)
        .every(key => !!this.article[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Merci de remplir tous les champs.'
        return
      }

      const articleId = this.$store.state.route.params.articleId
      try {
        // quand tous les champs sont remplis on appelle put
        await ArticlesService.put(this.article)
        // et on redirige le user vers l'article sur lequel il était
        this.$router.push({
          name: 'article',
          params: {
            articleId: articleId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  // Vue appelle le mounted()hook lorsque le composant est ajouté au DOM. Il est le plus souvent utilisé pour envoyer une requête HTTP pour récupérer des données que le composant rendra ensuite.
  async mounted () {
    try {
      // fetch l'article
      const articleId = this.$store.state.route.params.articleId
      this.article = (await ArticlesService.show(articleId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
</style>
