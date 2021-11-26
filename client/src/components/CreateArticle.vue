<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Détails de l'article">
      <v-text-field
          label="Votre identifiant"
          required
          :rules="[required]"
          v-model="article.username"
        ></v-text-field>

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
          label="Source Image Url"
          required
          :rules="[required]"
          v-model="article.sourceImageUrl"
        ></v-text-field>

        <v-text-field
          label="Lien"
          required
          :rules="[required]"
          v-model="article.lien"
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
        class="red accent-2"
        @click="create">
        Créer un article
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
        username: null,
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
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.article)
        .every(key => !!this.article[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Merci de remplir tous les champs.'
        return
      }

      try {
        await ArticlesService.post({
          // données du formulaire
          ...this.article,
          // on recupère l'id du user loggé
          user_id: this.$store.state.user.id
        })
        this.$router.push({
          name: 'articles'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
