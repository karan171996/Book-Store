const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://karan171996:${encodeURIComponent(
      process.env.MONGODB_PASSWORD
    )}@cluster0.ilaku.mongodb.net/test?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => console.log("mongo error", err));
};

module.exports = mongoConnect;
