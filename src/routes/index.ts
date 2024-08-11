import { Router } from "express";
import AuthRoutes from "./auth.routes";
import SystemConfig from "./system-config.routes";
import { validateJWT } from "../middlewares/jwt-validation.middleware";

const AppRoutes = Router()


AppRoutes.use('/auth', AuthRoutes)

AppRoutes.use('/system-config', validateJWT, SystemConfig)

export default AppRoutes;