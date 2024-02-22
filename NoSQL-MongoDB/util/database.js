const dotenv = require('dotenv');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

dotenv.config();

const password = process.env.MONGODB_PASSWORD;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://dalilahonic1:${password}@cluster0.x7ak3eh.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

function getDb() {
  if (_db) {
    return _db;
  }

  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
