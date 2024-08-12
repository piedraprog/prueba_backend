import { Router } from 'express';
import { 
    getEvaluations,
    getEvaluationById,
    submitEvaluation,
    updateEvaluation,
    createEvaluation
} from '../controllers/evaluation/evaluation.controller';

const EvaluationRoutes = Router();

EvaluationRoutes.get('/', getEvaluations);

EvaluationRoutes.get('/:id', getEvaluationById);

EvaluationRoutes.post('/', createEvaluation);

EvaluationRoutes.post('/:id/submit', submitEvaluation);

EvaluationRoutes.put('/:id', updateEvaluation);


export default EvaluationRoutes;