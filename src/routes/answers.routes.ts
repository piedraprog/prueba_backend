import { Router } from 'express';
import { getAnswersByEvaluationId } from '../controllers/evaluation/answer.controller'

const AnswersRoutes = Router();

AnswersRoutes.get('/:id', getAnswersByEvaluationId);


export default AnswersRoutes;