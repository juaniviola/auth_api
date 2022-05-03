import app from './app.js';
import Database from './database/index.js';

const PORT = process.env.PORT || 8080;

const connectDb = async () => {
  try {
    const database = new Database();
    await database.connect();
    app.set('db', database);
  } catch (error) {
    console.log('Error: Database not connected');
  }
};

app.listen(PORT, async () => {
  await connectDb();
  console.log('Running at port: ', PORT);
});
