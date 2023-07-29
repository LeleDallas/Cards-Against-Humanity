import * as dotenv from "dotenv";
import { Collection, Db, MongoClient } from "mongodb";

export const collections: { cards?: Collection } = {}

export async function connectToDatabase() {
  dotenv.config();

  if (process.env.DB_CONN_STRING) {
    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: Db = client.db(process.env.DB_NAME);

    const cardsCollection: Collection = db.collection(process.env.CARDS_COLLECTION_NAME!);

    collections.cards = cardsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${cardsCollection.collectionName}`);
  }
}