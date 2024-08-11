import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export interface IUserOrgRole extends Document {
    user_id: mongoose.Types.ObjectId;
    org_id: mongoose.Types.ObjectId;
    role_id: mongoose.Types.ObjectId;
    created_at: Date;
    updated_at: Date;
}

const userOrgRoleSchema: Schema<IUserOrgRole> = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    org_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserOrgRole = mongoose.model<IUserOrgRole>('UserOrgRole', userOrgRoleSchema);

// Zod schema for UserOrgRole validation
export const UserOrgRoleValidationSchema = z.object({
    user_id: z.string().uuid(),
    org_id: z.string().uuid(),
    role_id: z.string().uuid()
});
