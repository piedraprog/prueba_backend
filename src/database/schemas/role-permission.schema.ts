import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export interface IRolePermission extends Document {
    role_id: mongoose.Types.ObjectId;
    permission_id: mongoose.Types.ObjectId;
    created_at: Date;
    updated_at: Date;
}

const rolePermissionSchema: Schema<IRolePermission> = new Schema({
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    permission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const RolePermission = mongoose.model<IRolePermission>('RolePermission', rolePermissionSchema);

// Zod schema for RolePermission validation
export const RolePermissionValidationSchema = z.object({
    role_id: z.string().uuid(),
    permission_id: z.string().uuid()
});

