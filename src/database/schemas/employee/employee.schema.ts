import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IEmployee extends Document {
    user_id: mongoose.ObjectId;
    direction: string; // Información personal
    phone: string; // Información personal
    position: string; // Información profesional
    department: string; // Información profesional
    delete: boolean;
    deleted_at: Date;
    restore_at: Date;
    created_at: Date;
    updated_at: Date;
}

const employeeSchema: Schema<IEmployee> = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    direction: { type: String, required: true }, // Información personal
    phone: { type: String, required: true }, // Información personal
    position: { type: String, required: true }, // Información profesional
    department: { type: String, required: true }, // Información profesional
    delete: { type: Boolean, default: false },
    deleted_at: { type: Date },
    restore_at: { type: Date }, 
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);


export const EmployeeValidationSchema = z.object({
    user_id: z.string(),
    direction: z.string().min(20), // Información personal
    phone: z.string().min(9), // Información personal
    position: z.string().min(1), // Información profesional
    department: z.string().min(1) // Información profesional
});