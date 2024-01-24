import { config } from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { User } from './app/Models/User';
import { Database } from './configs/Database';

config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

new Database().connect();

const userModel = new User().getModel();

app.get('/', async (req: Request, res: Response) => {
    // res.send('Hello World');

    // return all user
    try {
        const users = await userModel.find();

        if (users.length==0) {
            return res.status(404).json({
                message: 'not found',
            });
        }

        res.status(200).json({
            message: 'success',
            data: users.length,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
