import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userProfile from './schema.js';

dotenv.config();

const URI = process.env.URI;

const app = express();

// const user = new userProfile();
// user.save();
// console.log(user);

// userProfile
//   .create({
//     username: 'username',
//     social: {
//       following: 100,
//       followers: 100,
//     },
//     posts: [{ title: 'Naslov', body: 'desc' }],
//   })
//   .then((user) => {
//     console.log(user);
//   });

// user
//   .findByUsername()
//   .then((data) => console.log(data));

// const dalila = new userProfile({ username: 'Honic' });
// dalila.save();

// dalila.findByUsername().then((data) => console.log(data));

// dalila.hello();

// userProfile
//   .findByUsername('Dalila')
//   .then((user) => console.log(user));

mongoose.connect(URI).then(() => {
  console.log('connected to mongodb');
  app.listen(5000);
});
