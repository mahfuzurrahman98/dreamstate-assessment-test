import mongoose from 'mongoose';

export class Database {
    private readonly dbURL: string = '';

    constructor() {
        this.dbURL = process.env.DB_LIVE_URL as string;
    }

    public async connect(): Promise<void> {
        try {
            console.log(this.dbURL)
            await mongoose.connect(this.dbURL);
            console.log('Connection created');
        } catch (error) {
            console.log(error);
        }
    }
}
