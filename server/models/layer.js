

module.exports = (sequelize, DataTypes) => {
  const Layer= sequelize.define('layer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      field: 'client_id'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    icon: {
      type: DataTypes.STRING
    },
    brief: {
      type: DataTypes.JSONB,
      field:'columns'
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
  Layer.associate = (models) => {
    Layer.belongsTo(models.client);
    Layer.hasMany(models.feature);
  }


  return Layer;
}
