const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://karan171996:${encodeURIComponent(
      process.env.MONGODB_PASSWORD
    )}@cluster0.ilaku.mongodb.net/shop?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log("mongo error", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database Found!";
};

module.exports = {
  mongoConnect,
  getDb,
};
