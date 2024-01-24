import { Model, Schema, model, models } from 'mongoose';
import { IUser } from '../../interfaces/user';

export class User {
    private collectionName: string;
    private schema: Schema<IUser>;

    constructor() {
        this.collectionName = 'users';
        this.schema = new Schema<IUser>(
            {
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
                deletedAt: {
                    type: Date,
                    default: null,
                },
            },
            { timestamps: true }
        );
    }

    public getModel(): Model<IUser> {
        return (
            models[this.collectionName] ||
            model<IUser>(this.collectionName, this.schema)
        );
    }
}
