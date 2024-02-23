const dotenv = require('dotenv');

dotenv.config();
const password = process.env.MONGODB_PASSWORD;

const mongoDBURL = `mongodb+srv://dalilahonic1:${password}@cluster0.x7ak3eh.mongodb.net/book-collection?retryWrites=true&w=majority`;

const PORT = 3000;

exports.port = PORT;
exports.url = mongoDBURL;
