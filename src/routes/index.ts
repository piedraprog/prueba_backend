import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validation.middleware";
import AuthRoutes from "./auth.routes";
import SystemConfig from "./system-config.routes";
import EmployeeRoutes from "./employees.routes";
import EvaluationRoutes from "./evaluations.routes";
import QuestionRoutes from "./questions.routes";
import AnswersRoutes from "./answers.routes";

const AppRoutes = Router()


AppRoutes.use('/auth', AuthRoutes)

AppRoutes.use('/system-config', validateJWT, SystemConfig);

AppRoutes.use('/employee', validateJWT, EmployeeRoutes);

AppRoutes.use('/evaluations', EvaluationRoutes);

AppRoutes.use('/questions', QuestionRoutes)

AppRoutes.use('/answers', AnswersRoutes)



export default AppRoutes;