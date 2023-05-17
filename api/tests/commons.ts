import * as server from '../src/server';

const DB_CONN_STRING = 'mongodb://admin:admin@localhost:27018';
const DB_NAME = 'test';

export function startTestServer() {
  return server.start({ dbUrl: DB_CONN_STRING, dbName: DB_NAME });
}

export function stopDevServer() {
  return server.stop();
}
