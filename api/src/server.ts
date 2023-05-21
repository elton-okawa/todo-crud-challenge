import express from 'express';
import { schema } from './schemas';
import { Database } from './data/shared/database';
import expressPlayground from 'graphql-playground-middleware-express';
import { sleepMiddleware } from 'middlewares';
import { Server as HttpServer } from 'http';
import path from 'path';
import { createHandler } from 'graphql-http/lib/use/express';
import { UnauthorizedError, userService } from 'services';
import { GraphQLError } from 'graphql';

const PORT = 4000;
const GRAPH_QL_ENDPOINT = '/graphql';

interface ServerParams {
  dbUrl: string;
  dbName: string;
  port?: number;
  graphqlEndpoint?: string;
  slow?: boolean;
}

export class Server {
  private db!: Database;
  private httpServer!: HttpServer;

  private dbUrl: string;
  private dbName: string;
  private port: number;
  private graphqlEndpoint: string;
  private slow: boolean;

  constructor(params: ServerParams) {
    this.dbUrl = params.dbUrl;
    this.dbName = params.dbName;
    this.port = params.port ?? PORT;
    this.graphqlEndpoint = params.graphqlEndpoint ?? GRAPH_QL_ENDPOINT;
    this.slow = params.slow ?? false;
  }

  get database() {
    return this.db;
  }

  async start() {
    await this.connectDb();

    const app = express();

    // WARNING - Only for showcase purpose
    if (this.slow) {
      app.use(sleepMiddleware);
    }

    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.all(this.graphqlEndpoint, this.createGraphQLHandler());

    // In order to avoid exposing our apis, we could check current environment and add or not. e.g.
    // if (NODE_ENV === 'development')
    app.get(
      '/playground',
      expressPlayground({ endpoint: this.graphqlEndpoint })
    );

    this.httpServer = app.listen(this.port, () =>
      console.log(
        `Running a GraphQL API server at port '${this.port}' at ${this.graphqlEndpoint}`
      )
    );
  }

  async stop() {
    await this.db.disconnect();
    this.httpServer.close();
  }

  clearDb() {
    return this.db.clearDb();
  }

  private async connectDb() {
    this.db = new Database({
      url: this.dbUrl,
      name: this.dbName,
    });
    try {
      await this.db.connect();
    } catch (error) {
      console.error('Database connection error', error);
      process.exit(1);
    }
  }

  private createGraphQLHandler() {
    return createHandler({
      schema,
      formatError: (error) => {
        console.error(error);
        return error;
      },
      context: async (req) => {
        // TODO typing from handler is strange, even official recipe tells you to access header directly
        // https://github.com/graphql/graphql-http#auth
        const token =
          (req.headers as Record<string, any>).authorization?.replace(
            'Bearer ',
            ''
          ) ?? '';

        if (!token) {
          return { user: null };
        }

        try {
          const user = await userService.getAuthenticatedUser(token);
          return { user };
        } catch (error) {
          return { error };
        }
      },
    });
  }
}
