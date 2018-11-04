import { GraphQLScalarType,GraphQLError } from 'graphql';
import GJV from 'geojson-validation';

import parseLiteral from './parseLiteral';

const validate = value => {
  if (!GJV.isPoint(value)) {
    throw new GraphQLError(`Expected GeoJSON Point but got: ${JSON.stringify(value)}`);
  }
  return value;
};

export const PointScalar = {
  Point: new GraphQLScalarType({
    name: 'Point',
    description: 'Point custom scalar type',
    parseValue: value=>[value.y,value.x],
    serialize: value=>[value.y,value.x],
    parseLiteral: ast => validate(parseLiteral(ast))
  }),
}

