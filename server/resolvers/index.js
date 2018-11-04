import {ClientResolver} from './client'
import {UserResolver} from './user'
import {CategoryResolver} from './category'
import {LayerResolver} from './layer'
import {Scalars} from './scalars'
import {merge} from 'lodash'
import { FeatureResolver } from './feature';

const resolvers=merge(
  //ClientResolver,
  UserResolver,
  //CategoryResolver,
  LayerResolver,
  //FeatureResolver,
  Scalars)
export default resolvers