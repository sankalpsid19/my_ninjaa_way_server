// lib/mongodb.js

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Error connecting to database !!!");
}

let cachedClient = global.mongoose;

if (!cachedClient) {
  cachedClient = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cachedClient.conn) {
    return cachedClient.conn;
  }

  if (!cachedClient.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cachedClient.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cachedClient.conn = await cachedClient.promise;
  return cachedClient.conn;
}

module.exports = connectToDatabase;
