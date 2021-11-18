const {Article} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let articles = null
      const search = req.query.search
      // si search est dans le querystring
      if (search) {
        articles = await Article.findAll({
          // on veut trouver tous les articles qui correspondent aux critères
          where: {
            $or: [
              'titre', 'auteur', 'source'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        articles = await Article.findAll({
          limit: 10
        })
      }
      res.send(articles)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est apparue pendant le chargement des articles'
      })
    }
  },
  async show (req, res) {
    try {
      const article = await Article.findById(req.params.articleId)
      console.log('ici on est là', req.params.articleId)
      res.send(article)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est apparue en affichant des articles'
      })
    }
  },
  async post (req, res) {
    try {
      const article = await Article.create(req.body)
      res.send(article)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est apparue pendant la creation de de cet article'
      })
    }
  },
  // méthode put
  async put (req, res) {
    try {
      // on update le req.body où l'id = l'id de l'article
      await Article.update(req.body, {
        where: {
          // l'id de l'article est à l'intérieur de la route put
          id: req.params.articleId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est apparue pendant la mise à jour de cet article'
      })
    }
  },

  async remove (req, res) {
    try {
      const article = await Article.findById(req.params.articleId)
      await article.destroy()
      res.send(article)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en supprimant cet article'
      })
    }
  }
}
