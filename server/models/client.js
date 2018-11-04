
module.exports = (sequelize, DataTypes) => {
  const Client= sequelize.define('client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  mapboxKey: {
    type: DataTypes.STRING,
    field: 'mapbox_key'
  },
  tileList: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    field: 'tile_list'
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
Client.associate = (models) => {
  Client.hasMany(models.user);
  Client.hasMany(models.category);
}

return Client
}
