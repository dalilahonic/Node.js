import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

router.post('/', async function (req, res, next) {
  try {
    const { message } = req.body;

    if (!message) {
      throw new Error('Something went wrong');
    }

    res.json({ message });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

export default router;
