import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

enum QuestionType {
    TEXT = 'text',
    MULTIPLE_CHOICE = 'multiple_choice',
    RATING = 'rating',
}

export interface IQuestion extends Document {
    text: string;
    type: QuestionType;
    options?: IQuestion[];
    created_at: Date;
    updated_at: Date;
}

export const QuestionSchema: Schema<IQuestion> = new Schema({
    text: { type: String, required: true },
    type: { type: String, enum: Object.values(QuestionType), required: true },
    options: { type: [], default: [] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export const QuestionValidationSchema = z.object({
    text: z.string().min(1, "Question text is required"),
    type: z.enum(["text", "multiple_choice", "rating"]),
    options: z.array(z.any()).optional(),  
})