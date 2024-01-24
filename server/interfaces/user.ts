import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    google_auth?: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}