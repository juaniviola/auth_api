import { MongoClient } from 'mongodb';
import * as argon from 'argon2';

class Database {
  constructor({ url, dbName, collectionName }) {
    this.url = url ? url : (process.env.DB_URL || 'mongodb://localhost:27017/');
    this.dbName = dbName ? dbName : 'mydb';
    this.collectionName = collectionName ? collectionName : 'users';
    this.db = null;
    this.client = null;
  }

  async connect() {
    const { url, dbName, collectionName } = this;

    try {
      this.client = new MongoClient(url);
      await this.client.connect();
      const db = this.client.db(dbName);
      this.db = db;

      if (!db.collection(collectionName)) {
        await this.db.createCollection(collectionName);
      }

      return this.db;
    } catch (error) {
      throw new Error(error);
    }
  }

  async insertUser(name, email, password) {
    const { db, collectionName } = this;
    if (!db) return;

    try {
      const passwordHashed = await argon.hash(password);
      return db.collection(collectionName).insertOne({ name, email, password: passwordHashed });
    } catch (error) {
      throw new Error(error);
    }
  }

  findUser(data) {
    const { db, collectionName } = this;
    if (!db) return;

    return db.collection(collectionName).findOne(data);
  }
}

export default Database;
