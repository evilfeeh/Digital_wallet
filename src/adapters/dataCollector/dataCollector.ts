import { IdataCollector, IdataLog } from './dc-interface';
import { MongoClient } from 'mongodb'

export class DataCollector implements IdataCollector {
  private readonly client: MongoClient
  private readonly database: string;
  private readonly collection: string;
  constructor() {
    const url = `mongodb://${process.env.DATA_COLLECTOR_HOST}:${process.env.DATA_COLLECTOR_PORT}`;
    this.client = new MongoClient(url);
  }
  async save (params: IdataLog) {
    await this.client.connect();
    const collection = this.client.db(this.database).collection(this.collection);
    const date = new Date().toDateString();
    await collection.insertOne({ ...params, date });
    await this.client.close();
  }
}
