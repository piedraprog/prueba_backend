import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IUserSession extends Document {
    expires_at: Date;
    user_id: mongoose.Types.ObjectId;
    refresh_token?: string;
}

const userSessionSchema: Schema<IUserSession> = new Schema({
    expires_at: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    refresh_token: { type: String }
});

export const UserSession = mongoose.model<IUserSession>('UserSession', userSessionSchema);

// Zod schema for session validation
export const UserSessionValidationSchema = z.object({
    expires_at: z.date(),
    user_id: z.string().uuid(),
    refresh_token: z.string()
});
