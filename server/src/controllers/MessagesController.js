const {
  Message
} = require('../models')
// lodash pour la méthode extend
// const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      let messages = null
      // un user doit pouvoir chercher un message à partir de l'id d'un article
      // req.user.id vient du jwt token qui a été validé (et non plus de la querystring)
      // const userId = req.user.id
      // const {articleId} = req.query
      // const where = {
      //   UserId: userId
      // }
      // if (articleId) {
      //   where.ArticleId = articleId
      // }
      messages = await Message.findAll()
      // where: where,
      // include: [
      //   {
      //     model: Article, Message
      //   }
      // ]
      // .map(message => message.toJSON())
      // // on créé un nouvel objet avec extend avec message id et article associé
      // .map(message => _.extend(
      //   {},
      //   message.Article,
      //   message
      // ))
      res.send(messages)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en affichant les messages'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {articleId} = req.body
      // vérifier s'il existe déjà un message
      // const message = await Message.findOne({
      //   where: {
      //     ArticleId: articleId,
      //     UserId: userId
      //   }
      // })
      // if (message) {
      //   return res.status(400).send({
      //     error: 'Vous avez déjà créé un message'
      //   })
      // }
      const newMessage = await Message.create({
        // associe le message à un id d'article et un id de user
        ArticleId: articleId,
        UserId: userId
      })
      res.send(newMessage)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Une erreur est survenue dans la création du message'
      })
    }
  },
  // on ajoute ici de la sécurité au controlleur : au lieu d'utiliser findById on vérifie que ce soit le bon userid avec l'authentification contre le jwt token et non le user id de la querystring
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {messageId} = req.params
      const message = await Message.findOne({
        where: {
          id: messageId,
          UserId: userId
        }
      })
      if (!message) {
        return res.status(403).send({
          error: 'Vous avez pas accès à ce message'
        })
      }
      await message.destroy()
      res.send(message)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en supprimant ce message'
      })
    }
  }
}
