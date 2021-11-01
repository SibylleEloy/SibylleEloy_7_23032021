const {
  History,
  Article
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      // userid provenant de re.user.id et non req.query (query string) car authentification avec un user validé
      const userId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Article
          }
        ],
        group: [
          'ArticleId'
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Article,
          history
        ))
        // méthode uniqBy n'affiche qu'une fois l'article si vu plusieurs fois
      res.send(_.uniqBy(histories, history => history.ArticleId))
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est intervenue en affichant un historique'
      })
    }
  },
  async post (req, res) {
    try {
      // userid ne vient pas de req.body car authentification
      const userId = req.user.id
      const {articleId} = req.body
      const history = await History.create({
        ArticleId: articleId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Une erreur est intervenue en crééant un objet historique'
      })
    }
  }
}
