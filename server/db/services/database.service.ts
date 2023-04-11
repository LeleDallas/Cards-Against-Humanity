import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { cards?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const cardsCollection: mongoDB.Collection = db.collection(process.env.CARDS_COLLECTION_NAME!);

  collections.cards = cardsCollection;
  
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${cardsCollection.collectionName}`);
}