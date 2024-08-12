import { Router } from 'express';
import { 
    getEvaluations,
    getEvaluationById,
    submitEvaluation,
    updateEvaluation,
    createEvaluation
} from '../controllers/evaluation/evaluation.controller';
import { accessValidation } from '../middlewares/access.middleware';
import { PermissionEnum } from '../database/schemas/system-schemas/permission.schema';

const EvaluationRoutes = Router();

EvaluationRoutes.get('/', getEvaluations);

EvaluationRoutes.get('/:id', getEvaluationById);

EvaluationRoutes.post('/', accessValidation(PermissionEnum.WRITE), createEvaluation);

EvaluationRoutes.post('/:id/submit', submitEvaluation);

EvaluationRoutes.put('/:id', accessValidation(PermissionEnum.WRITE), updateEvaluation);


export default EvaluationRoutes;