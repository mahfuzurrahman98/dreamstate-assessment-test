import { config } from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';

config();

class Database {
    private static instance: Mongoose | null = null;

    public static getInstance(): Mongoose {
        if (!Database.instance) {
            mongoose
                .connect(process.env.DB_LIVE_URL as string)
                .then(() => {
                    console.log('Connected to MongoDB');
                })
                .catch((err) => {
                    console.log(err);
                });

            Database.instance = mongoose;
        }

        if (Database.instance) {
            return Database.instance;
        } else {
            throw new Error('Database connection failed');
        }
    }
}

export default Database;
