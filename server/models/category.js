
module.exports = (sequelize, DataTypes) => {
  const Category= sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.INTEGER,
    field: 'client_id'
  },
  parentId: {
    type: DataTypes.INTEGER,
    field: 'parent_id'
  },
  name: {
    type: DataTypes.STRING
  },
  icon: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  }
}, {
  freezeTableName: true,
  underscored: true,
  paranoid: true
});
Category.associate = (models) => {
  Category.belongsTo(models.client);
}

return Category
}
