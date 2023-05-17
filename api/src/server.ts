import express from 'express';
import { schema } from './schemas';
import { graphqlHTTP } from 'express-graphql';
import * as database from './data/database';
import expressPlayground from 'graphql-playground-middleware-express';
import { sleepMiddleware } from 'middlewares';
import { Server } from 'http';

const PORT = 4000;
const GRAPH_QL_ENDPOINT = '/graphql';

interface StartParams {
  dbUrl: string;
  dbName: string;
  port?: number;
  graphqlEndpoint?: string;
  slow?: boolean;
}

let server: Server;

export async function start({
  dbUrl,
  dbName,
  port = PORT,
  graphqlEndpoint = GRAPH_QL_ENDPOINT,
  slow = false,
}: StartParams) {
  try {
    await database.connect(dbUrl, dbName);
  } catch (error) {
    console.error('Database connection error', error);
    process.exit(1);
  }

  const app = express();

  // WARNING - Only for showcase purpose
  if (slow) {
    app.use(sleepMiddleware);
  }

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
    })
  );

  // In order to avoid exposing our apis, we could check current environment and add or not. e.g.
  // if (NODE_ENV === 'development')
  app.get('/playground', expressPlayground({ endpoint: graphqlEndpoint }));

  server = app.listen(port, () =>
    console.log(
      `Running a GraphQL API server at port '${port}' at ${graphqlEndpoint}`
    )
  );
}

export async function stop() {
  await database.disconnect();
  return server.close();
}
