import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IPermission extends Document {
    name: string;
    created_at: Date;
    updated_at: Date;
}

const permissionSchema: Schema<IPermission> = new Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Permission = mongoose.model<IPermission>('Permission', permissionSchema);

// Zod schema for permission validation
export const PermissionValidationSchema = z.object({
    name: z.string().min(1)
});

export enum  PermissionEnum {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
}