const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const Validate = require('./controllers/Validate')
const ArticlesController = require('./controllers/ArticlesController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')

// authentification des routes sensibles
const isAuthenticated = require('./policies/isAuthenticated')

// déclaration des routes qui pointent vers le controller / endpoints
// appel de la policy comme middleware function avant le controller

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  // login endpoint qui appelle la méthode login dans l'authentication controller
  app.post('/login',
    AuthenticationController.login)

  app.get('/profile',
    AuthenticationController.profile)

  app.get('/articles',
    ArticlesController.index)
  app.get('/articles/:articleId',
    isAuthenticated,
    ArticlesController.show)
  // appelle le contrôleur article avec la méthode put
  app.put('/articles/:articleId',
    isAuthenticated,
    Validate.grantAccess('updateAny', 'article'),
    ArticlesController.put)
  app.post('/articles',
    isAuthenticated,
    ArticlesController.post)
  app.delete('/articles/:articleId',
    isAuthenticated,
    Validate.grantAccess('deleteAny', 'article'),
    ArticlesController.remove)

  // pour bookmarks et histories, on utilise un endpoint authentification : le user doit être connecté, il doit y avoir ce jwt token qui doit être valide et connecté au bon utilisateur
  app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index)
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.remove)

  app.get('/histories',
    isAuthenticated,
    HistoriesController.index)
  // requête post pour créér l'historique
  app.post('/histories',
    isAuthenticated,
    HistoriesController.post)
}
