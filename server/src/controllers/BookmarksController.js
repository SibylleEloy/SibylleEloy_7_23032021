const {
  Bookmark,
  Article
} = require('../models')
// lodash pour la méthode extend
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      // un user doit pouvoir chercher un bookmark à partir de l'id d'un article
      // req.user.id vient du jwt token qui a été validé (et non plus de la querystring)
      const userId = req.user.id
      const {articleId} = req.query
      const where = {
        UserId: userId
      }
      if (articleId) {
        where.ArticleId = articleId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        // option include dans sequelize pour passer un array d'objets (ici articles) qu'on veut inclure en association avec le bookmark
        include: [
          {
            model: Article
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        // on créé un nouvel objet avec extend avzec bookmark id et article associé
        .map(bookmark => _.extend(
          {},
          bookmark.Article,
          bookmark
        ))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en affichant les bookmarks'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {articleId} = req.body
      // vérifier s'il existe déjà un bookmark
      const bookmark = await Bookmark.findOne({
        where: {
          ArticleId: articleId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'Vous avez déjà créé un bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        // associe le bookmak à un id d'article et un id de user
        ArticleId: articleId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Une erreur est survenue dans la création du bookmark'
      })
    }
  },
  // on ajoute ici de la sécurité au controlleur : au lieu d'utiliser findById on vérifie que ce soit le bon userid avec l'authentification contre le jwt token et non le user id de la querystring
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'Vous avez pas accès à ce bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en supprimant ce bookmark'
      })
    }
  }
}
