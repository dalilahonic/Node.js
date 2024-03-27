import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Person, UserProfile } from './schema.js';

dotenv.config();

const URI = process.env.URI;

const app = express();

// const user = new UserProfile();
// user.username = 'str'; // ValidationError: userProfile validation failed: username: Username must be longer than 5 characters
// user.save();
// console.log(user); //  social: {}, when minimize set to false
// console.log(user.$isEmpty('socials')); // true, check whether an object is empty

// UserProfile.create({
//   username: 'username',
//   social: {
//     following: 100,
//     followers: 100,
//   },
//   posts: [{ title: 'Naslov', body: 'desc' }],
// }).then((user) => {
//   console.log(user);
// });

// user
//   .findByUsername()
//   .then((data) => console.log(data));

// const dalila = new userProfile({ username: 'Honic' });
// dalila.save();

// dalila.findByUsername().then((data) => console.log(data));

// dalila.hello();

// UserProfile
//   .findByUsername('Dalila')
//   .then((user) => console.log(user));

// UserProfile
//   .find()
//   .byUsername('username')
//   .exec()
//   .then((user) => console.log(user));

// const Dalila = new Person({
//   firstName: 'Dalila',
//   lastName: 'Honić',
// });

// console.log(Dalila.getFullName); // Dalila Honić

// const newPerson = new Person();
// newPerson.getFullName = 'Dalila Honic';
// console.log(newPerson);
// {
//   _id: new ObjectId('66033dda89f2bed59369c1c2'),
//   firstName: 'Dalila',
//   lastName: 'Honic'
// }

// const newPerson2 = new Person({ name: 'John' });
// newPerson2.save();
// console.log(newPerson2.id); // undefined, when id is set to false
// console.log(newPerson2); // { n: 'John'}
// console.log(newPerson2.name); // John
// console.log(newPerson2.n); // John
// console.log(newPerson2.toObject({ virtuals: true }));
// {
//   n: 'John',
// name: 'John',
// ....
// }

// newPerson2.name = 'New Name';
// console.log(newPerson2); // { n: 'New Name'}

// const newPerson3 = new Person({ property: 'value' }); //StrictModeError: Field `property` is not in schema and strict mode is set to throw.

// deletes the first document that matches the query
// UserProfile.deleteOne({ username: 'Dalila' }).then(
//   (data) => {
//     console.log(data);
//     // { acknowledged: true, deletedCount: 1 }
//   }
// );

// deletes all documents that match the query
// UserProfile.deleteMany({ username: 'Dalila' }).then(
//   (data) => {
//     console.log(data);
//     // { acknowledged: true, deletedCount: 4 }
//   }
// );

// UserProfile.where('username')
//   .equals('Dalila')
//   .then((user) => console.log(user));
// find a user where 'username' is equal to 'Dalila'\

// const user1 = new UserProfile({
//   age: 32,
//   usrename: 'nekoIme',
//   email: 'nekiemailnpr',
// });

// user1.save();

UserProfile.where('age')
  .gt('20')
  .lte('31')
  // .limit(2) // limit to two users
  // .select('age username') // only get the age and username fields
  .populate('reletedPerson') // populate reletedPerson field
  .then((users) => {
    console.log(users[0]);
  });
// finds users where age is greater than 20 and less then 31
// you can keep chaingin these

mongoose.connect(URI).then(() => {
  console.log('connected to mongodb');
  app.listen(5000);
});
