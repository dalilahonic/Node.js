import express from 'express';
import routes from './routes.js';
// import bodyParser from 'body-parser';

const app = express();

// app.use(bodyParser);
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    error: error.message,
    statusCode: error.statusCode,
  });
});

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});
