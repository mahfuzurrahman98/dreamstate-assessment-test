import { Mongoose } from 'mongoose';
import Database from '../../configs/Database';
import { IUser } from '../../interfaces/user';

const db: Mongoose = Database.getInstance();

const collectionName = 'users';
const schema = new db.Schema<IUser>(
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

const userModel =
    db.models[collectionName] || db.model<IUser>(collectionName, schema);

export default userModel;
