
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { INFO_MSG } from '../utils/message';
import { UserOrgRole } from '../database/schemas/user-org-role.schema';
import { RolePermission } from '../database/schemas/role-permission.schema';
import { Permission } from '../database/schemas/permission.schema';

export const accessValidation = (requiredPermission: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body.decoded;
      const userOrgRole = await UserOrgRole.findOne({ user_id });

      if (!userOrgRole) {
        return res.status(403).json({ message: 'User role not found' });
      }

      const rolePermissions = await RolePermission.find({ role_id: userOrgRole.role_id });
      const permissions = await Promise.all(
        rolePermissions.map(rolePermission => Permission.findById(rolePermission.permission_id))
      );

      const hasPermission = permissions.some(permission => permission?.name === requiredPermission);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      next();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

};
