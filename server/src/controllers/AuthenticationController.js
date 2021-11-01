// la librairie jwt : JSON Web Token (JWT) permet un échange sécurisé de données
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

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
      // on créé un user
      const user = await User.create(req.body)
      // on renvoie un jwt token après qu'un user s'enregistre
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
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
          error: 'Les informations de Login sont incorrectes'
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
        error: 'Une erreur est apparue en vous connectant'
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

// grantAccess (action, resource) {
//   return async (req, res, next) => {
//     try {
//       const modifiedAction = action
//       // Check for userId and modify action from updateAny to updateOwn
//       // when current user updates his/her own info
//       if (req.user.userId === req.params.userId) {
//         // eslint-disable-next-line no-const-assign
//         modifiedAction = action.replace('Any', 'Own')
//       }

//       // Permission to perform the specified action of the provided resource
//       const permission = Roles.roles.can(req.user.role)[modifiedAction](resource)
//       // No permission => 401
//       if (!permission.granted) {
//         // eslint-disable-next-line no-undef
//         throw new ErrorHandlers.ErrorHandler(
//           401,
//           "You don't have enough permission to perform this action"
//         )
//       }
//       next()
//     } catch (error) {
//       next(error)
//     }
//   }
// }
