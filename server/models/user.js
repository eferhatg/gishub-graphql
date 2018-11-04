

module.exports = (sequelize, DataTypes) => {
  const User= sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      field: 'client_id'
    },
    email: {
      type: DataTypes.STRING
    },
    sessionToken: {
      type: DataTypes.STRING,
      field: 'session_token'
    },
    mapTile:  {
      type: DataTypes.STRING,
      field: 'map_tile'
    },
    initialZoom: {
      type: DataTypes.INTEGER,
      field: 'initial_zoom'
    },

    initialPosition: {
      type: DataTypes.GEOMETRY('POINT'),
      field: 'initial_position'
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
  User.associate = (models) => {
    User.belongsTo(models.client);
  }


  return User;
}
