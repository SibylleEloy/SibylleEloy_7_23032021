module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    titre: DataTypes.STRING,
    auteur: DataTypes.STRING,
    source: DataTypes.STRING,
    sourceImageUrl: DataTypes.STRING,
    lien: DataTypes.STRING,
    texte: DataTypes.TEXT
    // tab: DataTypes.TEXT
  })

  Article.associate = function (models) {
  }

  return Article
}
