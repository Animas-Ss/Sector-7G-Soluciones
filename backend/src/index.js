import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { router } from './routes/index.routes.js';


dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on link http://localhost:${PORT}`);
});