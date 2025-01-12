import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { PORT, PUBLIC_URL } from './constants';

dotenv.config();

const app: Application = express();

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../../public'), { maxAge: '1y' })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () =>
    console.log(`Server running locally on port: ${PORT}`)
  );
}

export default app;
