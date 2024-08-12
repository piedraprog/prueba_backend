import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validation.middleware";
import AuthRoutes from "./auth.routes";
import SystemConfig from "./system-config.routes";
import EmployeeRoutes from "./employees.routes";

const AppRoutes = Router()


AppRoutes.use('/auth', AuthRoutes)

AppRoutes.use('/system-config', validateJWT, SystemConfig)

AppRoutes.use(
    '/employee', 
    // validateJWT, 
    EmployeeRoutes)

export default AppRoutes;