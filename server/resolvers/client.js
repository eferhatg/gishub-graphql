import db from '../models'
export const ClientResolver = {
  Query: {
    client(_, args) {
      return db.client.find({ where: args ,include: [ db.category ]});
    },
    clients(_, args) {
      return db.client.findAll({ where: args,include: [ db.category ] });
    }
    
  }
};