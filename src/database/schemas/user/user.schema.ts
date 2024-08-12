import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
}

const userSchema: Schema<IUser> = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', userSchema);

// Zod schema for user validation
export const UserValidationSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
});

