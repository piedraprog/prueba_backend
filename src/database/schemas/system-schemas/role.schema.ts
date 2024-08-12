import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export interface IRole extends Document {
    name: string;
    created_at: Date;
    updated_at: Date;
}

const roleSchema: Schema<IRole> = new Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Role = mongoose.model<IRole>('Role', roleSchema);

// Zod schema for role validation
export const RoleValidationSchema = z.object({
    name: z.string().min(1)
});
