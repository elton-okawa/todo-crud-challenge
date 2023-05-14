import express from 'express';
import { schema } from './graphql';
import { graphqlHTTP } from 'express-graphql';

const PORT = 4000;
const GRAPH_QL_ENDPOINT = '/graphql';

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// In order to avoid exposing our apis, we could check current environment and add or not. e.g.
// if (NODE_ENV === 'development')
import expressPlayground from 'graphql-playground-middleware-express';
app.get('/playground', expressPlayground({ endpoint: GRAPH_QL_ENDPOINT }));

app.listen(PORT);

console.log(
  `Running a GraphQL API server at port '${PORT}' at ${GRAPH_QL_ENDPOINT}`
);
