import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IEvaluation extends Document {
  title: string;
  description: string;
  created_by: mongoose.Types.ObjectId;
  submit: boolean;
  questions_ids: string[];
  due_date: Date;
  submited_at: Date;
  created_at: Date;
  updated_at: Date;
}

const EvaluationSchema: Schema<IEvaluation> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submit: { type: Boolean, default: false },
  questions_ids: { type: [String], default: [] },
  submited_at: { type: Date },
  due_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const Evaluation = mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);


export const EvaluationValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  question_ids: z.array(z.string().min(5, "Question ID cannot be empty"), { 
    required_error: "At least one question is required" 
  }).nonempty("At least one question is required")
});