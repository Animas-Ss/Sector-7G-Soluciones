import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT, SESSION_SECRET } from './config/app.config.js';
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware.js';
import { setLocals } from './middlewares/auth.middleware.js';
import { router } from './routes/index.routes.js';
import { authRouter } from './routes/auth.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // cambiar a true si se usa HTTPS
}));
app.use(setLocals);

app.use(authRouter);
app.use(router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on link http://localhost:${PORT}`);
});
