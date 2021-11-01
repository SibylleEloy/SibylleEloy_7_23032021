// authentification endpoint
// la policy isAuthenticated est placée devant les routes et cela va appeler passport authenticate avec jwt strategy qui va appeler la strategy créée dans passport.js
const passport = require('passport')

module.exports = function (req, res, next) {
  // err et user viennent de passport.js, ils sont passés dans la function ici
  passport.authenticate('jwt', function (err, user) {
    // s'il y a une erreur ou si le user n'est pas défini
    if (err || !user) {
      res.status(403).send({
        error: 'vous avez pas accès à cette ressource'
      })
    } else {
      // le user est connecté, il existe dans le db, le token est validé par rapport au secret défini dans le fichier config
      req.user = user
      next()
    }
  })(req, res, next)
}
