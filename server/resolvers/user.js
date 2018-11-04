import db from '../models'
export const UserResolver = {
  Query: {
    userData(_, args) {
      return db.user.find({ where: args,include: [ db.client ] });
    }
    
  },
  Mutation:{
    loginUser(_,{email,password}){
      return {
        sessionToken: "String"
      }
    }
  }

};