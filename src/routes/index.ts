import { Router } from "express";
import AuthRoutes from "./auth.routes";


const AppRoutes = Router()


AppRoutes.use('/auth', AuthRoutes)


export default AppRoutes;