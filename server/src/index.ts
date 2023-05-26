import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
