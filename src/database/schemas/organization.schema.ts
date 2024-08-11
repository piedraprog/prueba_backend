import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IOrganization extends Document {
    name: string;
    created_at: Date;
    updated_at: Date;
}

const organizationSchema: Schema<IOrganization> = new Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Organization = mongoose.model<IOrganization>('Organization', organizationSchema);

// Zod schema for organization validation
export const OrganizationValidationSchema = z.object({
    name: z.string().min(1)
});
