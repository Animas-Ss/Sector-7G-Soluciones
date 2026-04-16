import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import { PORT } from './config/app.config.js';
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware.js';
import { router } from './routes/index.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on link http://localhost:${PORT}`);
});
