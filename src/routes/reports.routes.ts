import { Router } from 'express';
import { getEvaluationReport } from '../controllers/reports.controller';


const ReportsRoutes = Router();

ReportsRoutes.get('/:id', getEvaluationReport)

export default ReportsRoutes;