import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export interface IUserRole extends Document {
    user_id: mongoose.Types.ObjectId;
    role_id: mongoose.Types.ObjectId;
    created_at: Date;
    updated_at: Date;
}

const userRoleSchema: Schema<IUserRole> = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserRole = mongoose.model<IUserRole>('UserRole', userRoleSchema);

// Zod schema for UserRole validation
export const UserRoleValidationSchema = z.object({
    user_id: z.string().uuid(),
    org_id: z.string().uuid(),
    role_id: z.string().uuid()
});
