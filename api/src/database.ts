import * as mongoDB from 'mongodb';

const collections = {};

export async function connect(url: string, databaseName: string) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
  await client.connect();
  const db: mongoDB.Db = client.db(databaseName);

  // const gamesCollection = db.collection<Game>(process.env.GAMES_COLLECTION_NAME);
  // collections.games = gamesCollection;

  //and collection: ${Object.values(collections).map(collection => collection.collectionName)
  console.log(`Successfully connected to database: ${db.databaseName}`);
}
