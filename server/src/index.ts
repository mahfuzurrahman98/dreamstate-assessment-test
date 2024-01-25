import cors from 'cors';
import { config } from 'dotenv';
import express, { Express, json } from 'express';
import router from './routes';

config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(json());
app.use(cors());

// add publuc folder as static folder
app.use(express.static('public'));

// use routes
app.use(router);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
