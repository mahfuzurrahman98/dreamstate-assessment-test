import { Document, Model, Schema, model } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    google_auth?: boolean;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
}

export class User {
    private collectionName: string;
    private schema: Schema<IUser>;

    constructor() {
        this.collectionName = 'users';
        this.schema = new Schema<IUser>({
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            google_auth: {
                type: Boolean,
                required: false,
            },
            active: {
                type: Boolean,
                required: true,
            },
            created_at: {
                type: Date,
                required: true,
            },
            updated_at: {
                type: Date,
                required: true,
            },
            deleted_at: {
                type: Date,
                required: false,
            },
        });
    }

    public getModel(): Model<IUser> {
        return model(this.collectionName, this.schema);
    }
}
