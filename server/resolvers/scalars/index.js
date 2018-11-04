import {DateScalar} from './date'
import {PointScalar} from './point'
import {JSONScalar} from './json'
import { merge } from 'lodash';

const Scalars=merge(DateScalar,PointScalar,JSONScalar)
export {Scalars} 