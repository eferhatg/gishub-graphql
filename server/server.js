import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './schemas';
import cors from 'cors'
const GRAPHQL_PORT = 4444;

const graphQLServer = express();
graphQLServer.use(cors())
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema:schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ schema:schema,endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
