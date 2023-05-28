import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();

export const USER_ID = 1;

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
