import { Router } from 'express';
import { createQuestion, getQuestions, updateQuestion } from '../controllers/evaluation/question.controller';


const QuestionRoutes = Router();

QuestionRoutes.post('/',createQuestion);

QuestionRoutes.get('/', getQuestions);

QuestionRoutes.put('/:id', updateQuestion);


export default QuestionRoutes;