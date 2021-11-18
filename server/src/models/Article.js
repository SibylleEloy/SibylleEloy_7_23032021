module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    user_id: DataTypes.STRING,
    username: DataTypes.STRING,
    titre: DataTypes.STRING,
    auteur: DataTypes.STRING,
    source: DataTypes.STRING,
    sourceImageUrl: DataTypes.STRING,
    lien: DataTypes.STRING,
    texte: DataTypes.TEXT
    // identifiant: DataTypes.TEXT
    // tab: DataTypes.TEXT
  })

  Article.associate = function (models) {
    // Article.belongsTo(models.User, {
    //   foreignKey: 'user_id'
    // })
  }

  return Article
}
