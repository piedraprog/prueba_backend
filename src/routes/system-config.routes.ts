import { Router } from "express";
import SystemConfig from "../controllers/system-config";
import { accessValidation } from "../middlewares/access.middleware";
import { PermissionEnum } from "../database/schemas/permission.schema";

const SystemRouter = Router()


// Roles routes

SystemRouter.get('/roles', SystemConfig.getRoles)

SystemRouter.get('/roles/:id', SystemConfig.getRoleById)

SystemRouter.post('/roles', accessValidation(PermissionEnum.WRITE),SystemConfig.createRole)

SystemRouter.delete('/roles', accessValidation(PermissionEnum.DELETE),SystemConfig.deleteRole)

SystemRouter.put('/roles', accessValidation(PermissionEnum.WRITE),SystemConfig.updateRole)


// Permissions routes
SystemRouter.get('/permissions', SystemConfig.getPermissions)

SystemRouter.post('/permissions', accessValidation(PermissionEnum.WRITE),SystemConfig.createPermission)

SystemRouter.delete('/permissions', accessValidation(PermissionEnum.DELETE),SystemConfig.deletePermission)

SystemRouter.put('/permissions', accessValidation(PermissionEnum.WRITE),SystemConfig.updatePermission)



export default SystemRouter;
