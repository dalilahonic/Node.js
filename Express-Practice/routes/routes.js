const express = require('express');
const router = express.Router();

router.use(express.json()); // Parse JSON bodies

router.get('/', (req, res) => {
  res.send({ text: 'Hello World!' });
});

router.post('/form', (req, res) => {
  const fName = req.body.firstName;
  const lName = req.body.lastName;

  res.send({ fName, lName });
});

module.exports = router;
