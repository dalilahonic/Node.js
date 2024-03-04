const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.use(express.json());

router.get('/', (req, res) => {
  res.send({ text: 'Hello World!' });
});

router.post('/form', (req, res) => {
  const fName = req.body.firstName;
  const lName = req.body.lastName;

  const newUser = new User({
    firstName: fName,
    lastName: lName,
  });

  newUser
    .save()
    .then((user) => {
      console.log(user);
      res.json(newUser);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
