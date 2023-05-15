import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { schema } from './schemas';
import { graphqlHTTP } from 'express-graphql';
import * as database from './data/database';
import expressPlayground from 'graphql-playground-middleware-express';
import { sleepMiddleware } from 'middlewares/sleep.middleware';

const PORT = 4000;
const GRAPH_QL_ENDPOINT = '/graphql';

if (!process.env.DB_CONN_STRING || !process.env.DB_NAME) {
  console.error(
    `You must define environment variables 'DB_CONN_STRING' and 'DB_NAME'`
  );
  process.exit(1);
}

database
  .connect(process.env.DB_CONN_STRING ?? '', process.env.DB_NAME ?? '')
  .then(() => {
    const app = express();

    // WARNING - Only for showcase purpose
    app.use(sleepMiddleware);

    app.use(
      '/graphql',
      graphqlHTTP({
        schema: schema,
      })
    );

    // In order to avoid exposing our apis, we could check current environment and add or not. e.g.
    // if (NODE_ENV === 'development')
    app.get('/playground', expressPlayground({ endpoint: GRAPH_QL_ENDPOINT }));

    app.listen(PORT, () =>
      console.log(
        `Running a GraphQL API server at port '${PORT}' at ${GRAPH_QL_ENDPOINT}`
      )
    );
  })
  .catch((error) => {
    console.error('Database connection error', error);
    process.exit(1);
  });
