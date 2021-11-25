module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    username: DataTypes.STRING,
    comment: DataTypes.TEXT,
    timestamps: true,
    underscored: true,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      name: 'createdAt',
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      name: 'updatedAt',
      field: 'updated_at'
    }
  })

  Message.associate = function (models) {
    // Message.belongsTo(models.User)
    Message.belongsTo(models.Article)
  }

  return Message
}
