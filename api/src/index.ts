import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { Server } from './server';

if (!process.env.DB_CONN_STRING || !process.env.DB_NAME) {
  console.error(
    `You must define environment variables 'DB_CONN_STRING' and 'DB_NAME'`
  );
  process.exit(1);
}

(async function () {
  const server = new Server({
    dbUrl: process.env.DB_CONN_STRING ?? '',
    dbName: process.env.DB_NAME ?? '',
    slow: true,
  });
  await server.start();
})();
