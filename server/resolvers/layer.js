import db from '../models'
import Sequelize from 'Sequelize'
const Op = Sequelize.Op;
export const LayerResolver = {
  Query: {
    catsAndBrief(_, args) {
      const cats = db
        .category
        .findAll({where: args})
      const layerbrief = db
        .layer
        .findAll({where: args})
      return {categories: cats, layerBrief: layerbrief}
    },

    getLayer(_, args) {
      const layer = db
        .layer
        .find({
          where: args,
          include: [db.feature]
        });

      return layer;

    },

    getLayersById(_, layerIds) {

      return db
        .layer
        .findAll({
          where: {
            id: {
              [Op. in]: layerIds.ids
            }
          },
          include: [db.feature]
        });
    }

  }
};