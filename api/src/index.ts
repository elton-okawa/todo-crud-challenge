import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const PORT = 4000;
const GRAPH_QL = '/graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => {
    return 'Hello world!'
  },
}

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(PORT);

console.log(`Running a GraphQL API server at port '${PORT}' at ${GRAPH_QL}`);