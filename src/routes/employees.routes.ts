import { Router } from 'express';
import { 
    createEmployee,
    updateEmployee,
    softDeleteEmployee,
    getEmployees,
    restoreEmployee,
    getEmployeeById 
} from '../controllers/employee.controller';

const EmployeeRoutes = Router();

EmployeeRoutes.get('/', getEmployees);

EmployeeRoutes.get('/:id', getEmployeeById);

EmployeeRoutes.post('/', createEmployee);

EmployeeRoutes.put('/', updateEmployee);

EmployeeRoutes.put('/delete', softDeleteEmployee);

EmployeeRoutes.put('/restore', restoreEmployee);

export default EmployeeRoutes
