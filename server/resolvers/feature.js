import db from '../models'
export const FeatureResolver = {
  Query: {

    features(_, args) {
      return db.feature.findAll({ where: args });
    }
    
  }
};