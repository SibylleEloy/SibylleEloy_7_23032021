const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'groupomania',
    user: process.env.DB_USER || 'groupomania',
    password: process.env.DB_PASS || 'groupomania',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../groupomania.sqlite')
    }
  },
  // définition de la clé d'authentification : secret string seulement connu du serveur pour vérifier si le jwt token est valide ou non
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
