import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validation.middleware";
import AuthRoutes from "./auth.routes";
import SystemConfig from "./system-config.routes";
import EmployeeRoutes from "./employees.routes";
import EvaluationRoutes from "./evaluations.routes";
import QuestionRoutes from "./questions.routes";
import AnswersRoutes from "./answers.routes";
import ReportsRoutes from "./reports.routes";

const AppRoutes = Router()


AppRoutes.use('/auth', AuthRoutes)

AppRoutes.use('/system-config', validateJWT, SystemConfig);

AppRoutes.use('/employee', validateJWT, EmployeeRoutes);

AppRoutes.use('/evaluations', validateJWT, EvaluationRoutes);

AppRoutes.use('/questions', validateJWT, QuestionRoutes);

AppRoutes.use('/answers', validateJWT, AnswersRoutes);

AppRoutes.use('/reports', validateJWT, ReportsRoutes);

export default AppRoutes;