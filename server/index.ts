import { config } from 'dotenv';
import express, { Express } from 'express';
import { UserController } from './app/Controllers/UserController';
import { Database } from './configs/Database';

config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

new Database().connect();

// define controllers
const userController = new UserController();

app.get('/users', userController.index);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
