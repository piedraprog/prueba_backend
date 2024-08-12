import { Router } from 'express';
import { 
    createEmployee,
    updateEmployee,
    softDeleteEmployee,
    getEmployees,
    restoreEmployee,
    getEmployeeById 
} from '../controllers/employee.controller';
import { accessValidation } from '../middlewares/access.middleware';
import { PermissionEnum } from '../database/schemas/system-schemas/permission.schema';

const EmployeeRoutes = Router();

EmployeeRoutes.get('/', getEmployees);

EmployeeRoutes.get('/:id', getEmployeeById);

EmployeeRoutes.post('/', accessValidation(PermissionEnum.WRITE),createEmployee);

EmployeeRoutes.put('/', accessValidation(PermissionEnum.WRITE), updateEmployee);

EmployeeRoutes.put('/delete', accessValidation(PermissionEnum.DELETE), softDeleteEmployee);

EmployeeRoutes.put('/restore', accessValidation(PermissionEnum.DELETE), restoreEmployee);

export default EmployeeRoutes
