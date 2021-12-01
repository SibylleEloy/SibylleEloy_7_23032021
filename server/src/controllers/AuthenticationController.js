// la librairie jwt : JSON Web Token (JWT) permet un échange sécurisé de données
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
// importation de crypto-js pour chiffrer l'email
const cryptojs = require('crypto-js')

// helper method/fonction qui sign un objet user en utilisant la librairie jwt pour nous renvoyer un jwt token
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      // chiffrer l'email avant de l'envoyer dans la db
      const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, 'CLE_SECRETE').toString()
      console.log('--->CONTENU: emailCryptoJs')
      console.log(emailCryptoJs)
      // on créé un user
      const user = await User.create({
        password: req.body.password,
        email: emailCryptoJs
      })
      // const user = await User.create(req.body)
      // on renvoie un jwt token après qu'un user s'enregistre
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Cet email est déjà utilisé'
      })
    }
  },
  async login (req, res) {
    try {
    // on récupère un email du body
      const {email, password} = req.body
      // on cherche un user qui corresponde
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      // si le user n'existe pas
      if (!user) {
        return res.status(403).send({
          error: 'Les informations de connexion sont incorrectes'
        })
      }
      // si le user existe on compare le mot de passe de cet user au mdp récupéré dans le body
      const isPasswordValid = await user.comparePassword(password)
      // si le mdp est différent on revoie une erreur 403
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Les informations de login sont incorrectes'
        })
      }
      // si tout est ok, on renvoie un token et le passe au userJson via la helper method (qui génère le jwt)
      const userJson = user.toJSON()
      console.log(userJson)
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Erreur de connexion'
      })
    }
  },
  async profile (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'Cet utilisateur est introuvable'
      })
    }
  }
}
