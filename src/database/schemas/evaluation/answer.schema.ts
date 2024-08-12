import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

enum value {
    TEXT = 'text',
    boolean = 'boolean',
    number = 'number',
}

export interface IAnswer {
    question_id: mongoose.Types.ObjectId;
    value: any;
}

// Interfaz para un conjunto de respuestas asociado a un empleado
export interface IAnswers extends Document {
    employee_id: mongoose.Types.ObjectId;
    evaluation_id: mongoose.Types.ObjectId;
    answers: IAnswer[];
    created_at: Date;
    updated_at: Date;
}

// Esquema para una respuesta individual
const answerSchema: Schema<IAnswer> = new Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    // Mixed type to accept any data type for value
    value: { type: Schema.Types.Mixed, required: true },
});

// Esquema para el conjunto de respuestas de un empleado
const answersSchema: Schema<IAnswers> = new Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    answers: { type: [answerSchema], required: true },  // Embedding the individual answerSchema
    evaluation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Modelo de Mongoose para el conjunto de respuestas
export const Answers = mongoose.model<IAnswers>('Answers', answersSchema);

// Zod Schema para la validación
export const AnswerValidationSchema = z.object({
    question_id: z.string().nonempty("Question ID is required"),
    value: z.any({ required_error: "Answer is required" })
});

export const AnswersValidationSchema = z.object({
    employee_id: z.string().nonempty("Employee ID is required"),
    answers: z.array(AnswerValidationSchema).nonempty("At least one answer is required"),
    evaluation_id: z.string().nonempty("Evaluation ID is required")
});