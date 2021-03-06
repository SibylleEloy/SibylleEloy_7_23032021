const {
  Message,
  Article
} = require('../models')
// lodash pour la méthode extend
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      let messages = null
      // un user doit pouvoir chercher un message à partir de l'id d'un article
      // req.user.id vient du jwt token qui a été validé (et non plus de la querystring)
      // const userId = req.user.id
      const {articleId} = req.query
      const where = {
        ArticleId: articleId
      }
      if (articleId) {
        where.ArticleId = articleId
        messages = await Message.findAll({
          where: where,
          include: [
            {
              model: Article, Message
            }
          ]
        })
          .map(message => message.toJSON())
          // on créé un nouvel objet avec extend avec message id et article associé
          .map(message => _.extend(
            {},
            message.Article,
            message
          ))
      } else {
        messages = await Message.findAll({
          include: [
            {
              model: Article, Message
            }
          ]
        })
          .map(message => message.toJSON())
          // on créé un nouvel objet avec extend avec message id et article associé
          .map(message => _.extend(
            {},
            message.Article,
            message
          ))
      }
      res.send(messages)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en affichant les messages'
      })
    }
  },
  async post (req, res) {
    try {
      const {user_id} = req.body
      const {articleId} = req.body
      const {username} = req.body
      const {comment} = req.body
      const newMessage = await Message.create({
        user_id: user_id,
        ArticleId: articleId,
        username: username,
        comment: comment
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
      // utilisateur connecté sur la page
      const userId = req.user.id
      // const {messageId} = req.body.messageId
      const message = await Message.findOne({
        where: {
          // id: messageId
          User_id: userId
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
