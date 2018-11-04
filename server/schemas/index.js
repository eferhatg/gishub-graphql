import {makeExecutableSchema} from 'graphql-tools';
import resolvers from '../resolvers';
import {Client} from './client';
import {Category} from './category';
import {Layer} from './layer';
import {LayerBrief} from './layerbrief';
import {User} from './user';
import {Query} from './query';
import {Mutation} from './mutation';
import { Feature } from './feature';
import { CatsAndBrief } from './catsandbrief';
const schema = makeExecutableSchema({
  typeDefs: [
    Client,User,Category,Layer,LayerBrief,Feature,CatsAndBrief, Query,Mutation
  ],
  resolvers
});

export default schema;