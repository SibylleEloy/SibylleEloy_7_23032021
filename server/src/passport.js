const passport = require('passport')
const {User} = require('./models')

// librairies
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

// strategy qui va décoder et vérifier que le token qui vient avec le header est valide
passport.use(
  new JwtStrategy({
    // options
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
    // promise qui vérifie et envoie des messages basés sur le payload
  }, async function (jwtPayload, done) {
    try {
      // dès qu'on a une requête, on doit d'abord vérifier que le user existe dans le db
      const user = await User.findOne({
        where: {
          // jwtPayload est ce dans quoi on a décidé de mettre nos users encryptés dans l'AuthenticationController (cf fn jwtSignUser)
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      // si c'est ok, on retourne le user object vers la logique créée dans isAuthenticated.js
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
