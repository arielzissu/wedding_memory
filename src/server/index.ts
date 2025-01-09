import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { PORT, PUBLIC_URL } from './constants';

const app: Application = express();

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../../build'), { maxAge: Infinity })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

module.exports = app;
