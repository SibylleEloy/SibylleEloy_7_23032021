<template>
  <v-layout>
    <v-flex xs4>
      <form @submit.prevent="create" enctype="application/json">
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
        </form>
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

      <panel title="Ajouter une image" class="mt-2 ml-2">
        <form @submit.prevent="sendFile" enctype="application/json">
          <div class="field">
            <label for="file" class="label"></label>
            <input
              type="file"
              ref="file"
              @change="selectFile"
              >
          </div>
          <!-- <div class="field">
            <button>Envoyer</button>
          </div> -->
        </form>
      </panel>


      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="red accent-2 mt-2"
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
      // message: '',
      article: {
        username: null,
        titre: null,
        auteur: null,
        source: null,
        sourceImageUrl: null,
        lien: null,
        texte: null
      },
      file: null,
      error: null,
      required: (value) => !!value || 'Obligatoire.'
    }
  },
  methods: {
    selectFile () {
      this.file = this.$refs.file.files[0]
    },
    // async onSubmit () {
    //   const formData = new FormData()
    //   formData.append('file', this.file)
    //   try {
    //     await ArticlesService.post('/')
    //   }
    // },
    async create () {
      const formData = new FormData()
      formData.append('article', JSON.stringify(this.article))
      formData.append('user_id', this.$store.state.user.id)
      formData.append('file', this.file, this.file.name)
      console.log(this.file)
      console.log(this.article)
      console.log(formData)
      this.error = null
      const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': '*/*'
        }
      }
      const areAllFieldsFilledIn = Object
        .keys(this.article)
        .every(key => !!this.article[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Merci de remplir tous les champs.'
        return
      }

      try {
        await ArticlesService.post(formData, config)
        this.message = 'Chargé !'
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
