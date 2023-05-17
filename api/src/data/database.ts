import * as mongoDB from 'mongodb';
import { TodoEntity } from './todo.entity';

export const collections: {
  todo: mongoDB.Collection<TodoEntity>;
} = {} as any;

let client: mongoDB.MongoClient;

export async function connect(url: string, databaseName: string) {
  client = new mongoDB.MongoClient(url);
  await client.connect();

  const db: mongoDB.Db = client.db(databaseName);

  collections.todo = db.collection<TodoEntity>('todo');

  console.log(
    `Successfully connected to database: ${
      db.databaseName
    } with collections ${Object.values(collections).map(
      (collection) => collection.collectionName
    )}`
  );
}

export function disconnect() {
  return client.close();
}
