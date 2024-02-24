const express = require('express');
const mongoose = require('mongoose');
const PORT = require('./config').port;
const mongoUrl = require('./config').url;
const Book = require('./models/bookModel');

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
  return response.status(234).send('Hello World');
});

app.post('/books', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message:
          'Send all required fields: title, author, publish year',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// get all books from a databse
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();

    return res
      .status(200)
      .json({ count: books.lengtg, data: books });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// get one book from database by id
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// update a book
app.put('/books/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message:
          'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(
      id,
      req.body
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: 'Book not found' });
    }
    return res
      .status(200)
      .send({ message: 'Book updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Delete a book

app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: 'Book not found' });
    }

    return res
      .status(200)
      .send({ message: 'Book deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
