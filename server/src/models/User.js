// bluebird est une Promise librairie
const Promise = require('bluebird')
// promisifyAll de bcrypt qui prend n'importe quelle function avec une structure en callback et va lui permettre d'utiliser le format promise
// package bcrypt pour ajouter un salt hash
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

// méthode de hashage du password avec un salt factor
function hashPassword (user, options) {
  const SALT_FACTOR = 8
  // si le password n'a pas changé
  if (!user.changed('password')) {
    return
  }
  // sinon on le sale, on le hash
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.ENUM(['Employe', 'Administrateur'])
  }, {
    // avant d'enregistrer l'objet User, on hash le password
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })
  // le model User compare les passwords plutot que le controlleur
  User.prototype.comparePassword = function (password) {
    // on compare le password encrypté envoyé au password du model User
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {
  //   User.hasMany(Article, {foreignKey: 'username'})
  }

  return User
}
