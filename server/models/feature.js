

module.exports = (sequelize, DataTypes) => {
  const Feature= sequelize.define('feature', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    layerId: {
      type: DataTypes.INTEGER,
      field: 'layer_id'
    },
    geometry: {
      type: DataTypes.GEOMETRY
    },
    properties: {
      type: DataTypes.JSONB
    },
    type: {
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
  Feature.associate = (models) => {
    Feature.belongsTo(models.layer);
  }


  return Feature;
}
