const dotenv = require('dotenv');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

dotenv.config();

const mongoConnect = (callback) => {
  const password = process.env.MONGODB_PASSWORD;

  MongoClient.connect(
    `mongodb+srv://dalilahonic1:${password}@cluster0.geaafkb.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('Connected!');
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
