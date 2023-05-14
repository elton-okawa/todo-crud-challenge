import * as mongoDB from 'mongodb';
import { TodoEntity } from './todo.entity';

export const collections: {
  todo: mongoDB.Collection<TodoEntity>;
} = {} as any;

export async function connect(url: string, databaseName: string) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
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
