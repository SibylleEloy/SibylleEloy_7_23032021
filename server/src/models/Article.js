module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    user_id: DataTypes.STRING,
    username: DataTypes.STRING,
    titre: DataTypes.STRING,
    auteur: DataTypes.STRING,
    source: DataTypes.STRING,
    sourceImageUrl: DataTypes.STRING,
    lien: DataTypes.STRING,
    texte: DataTypes.TEXT,
    file: DataTypes.TEXT
    // identifiant: DataTypes.TEXT
    // tab: DataTypes.TEXT
  })

  Article.associate = function (models) {
    Article.hasMany(models.Message, {
      onDelete: 'cascade',
      hooks: true
    })
    //   foreignKey: 'user_id'
    // })
  }

  return Article
}
