
import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../database/schemas/user-role.schema';
import { RolePermission } from '../database/schemas/role-permission.schema';
import { Permission } from '../database/schemas/permission.schema';
import { INFO_MSG } from '../utils/message';
import { createResponse } from '../utils/create-response';

export const accessValidation = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body.decoded;
      
      const userRole = await UserRole.findOne({ user_id });

      if (!userRole) {
        return res.status(403).send(
          createResponse(false, INFO_MSG.errorFetching, null, 'User role not found.')
        )
      }

      const rolePermissions = await RolePermission.find({ role_id: userRole.role_id });
      
      const permissions = await Promise.all(
        rolePermissions.map((rolePermission) =>
          Permission.findById(rolePermission.permission_id)
        )
      );

      const hasPermission = permissions.some(permission => permission?.name === requiredPermission);

      if (!hasPermission) {
        return res.status(403).send(
          createResponse(false, INFO_MSG.errorFetching, null, 'User does not have permission.')
        )
      }

      next();
    } catch (error: any) {
      res.status(500).send(
        createResponse(false, INFO_MSG.errorFetching, null, error.message)
      )
    }
  };

};
