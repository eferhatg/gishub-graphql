import db from '../models'
export const CategoryResolver = {
  Query: {
    categories(_, args) {
      return db.category.findAll({ where: args });
    }
    
  }
};