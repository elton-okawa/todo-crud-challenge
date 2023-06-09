import * as mongoDB from 'mongodb';
import { TodoEntity } from '../todo.entity';
import { UserEntity } from '../user';

export interface Collections {
  todo: mongoDB.Collection<TodoEntity>;
  user: mongoDB.Collection<UserEntity>;
}

export let collections = {} as Collections;

export interface DatabaseParams {
  url: string;
  name: string;
}

export class Database {
  private client!: mongoDB.MongoClient;
  private db!: mongoDB.Db;
  public collections!: Collections;

  constructor(private params: DatabaseParams) {}

  async connect() {
    console.log(
      `Connecting to '${this.params.url}' in db '${this.params.name}'`
    );
    this.client = new mongoDB.MongoClient(this.params.url);
    await this.client.connect();

    this.db = this.client.db(this.params.name);

    this.collections = {
      todo: this.db.collection<TodoEntity>('todo'),
      user: this.db.collection<UserEntity>('user'),
    };
    collections = this.collections; // TODO refactor persistence to use this class

    console.log(
      `Successfully connected to database: ${
        this.db.databaseName
      } with collections ${Object.values(collections).map(
        (collection) => collection.collectionName
      )}`
    );
  }

  disconnect() {
    return this.client.close();
  }

  clearDb() {
    if (
      !this.params.url.includes('localhost') ||
      process.env.NODE_ENV !== 'test'
    ) {
      throw new Error(
        'You must not call it outside test or using a database besides a local one'
      );
    }

    return this.db.dropDatabase();
  }
}
