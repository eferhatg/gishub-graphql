import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import parseLiteral from './parseLiteral';
function identity(value) {
  return value;
}



export const JSONScalar = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description:
      'The `JSON` scalar type represents JSON values as specified by ' +
      '[ECMA-404](http://www.ecma-international.org/' +
      'publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: identity,
    parseValue: identity,
    parseLiteral,
  }),
}
