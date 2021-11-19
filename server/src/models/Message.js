module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    titre: DataTypes.STRING,
    username: DataTypes.STRING,
    texte: DataTypes.TEXT,
    date: DataTypes.DATE
  })

  Message.associate = function (models) {
    Message.belongsTo(models.User)
    Message.belongsTo(models.Article)
  }

  return Message
}
