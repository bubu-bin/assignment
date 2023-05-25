import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const { PORT } = process.env;

app.get('/', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
