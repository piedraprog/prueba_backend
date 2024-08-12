import { Request, Response } from 'express';
import { Role } from '../../database/schemas/system-schemas/role.schema';
import { createResponse } from '../../utils/create-response';
import { INFO_MSG } from '../../utils/message';
import { RolePermission } from '../../database/schemas/system-schemas/role-permission.schema';
import { Permission } from '../../database/schemas/system-schemas/permission.schema';


export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    const rolesWithPermissions = await Promise.all(
      roles.map(async (role) => {
        const rolePermissions = await RolePermission.find({ role_id: role._id }).populate('permission_id');
        return {
          role,
          permissions: rolePermissions.map(rp => rp.permission_id)
        };
      })
    );
    return res.status(200).send(createResponse(true, INFO_MSG.successFetching, rolesWithPermissions));
  } catch (error: any) {
    return res.status(500).send(createResponse(false, INFO_MSG.errorFetching, null, error.message));
  }
}

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("🚀 ~ getRoleById ~ id:", id)
    
    const role = await Role.findById(id);

    if (!role) {
        return res.status(404).send(
          createResponse(false, INFO_MSG.errorFetchingById)
        );
    }

    const rolePermissions = await RolePermission
      .find({ role_id: role._id })
      .populate('permission_id');

    return res.status(200).send(createResponse(true, INFO_MSG.successFetching, {
        role,
        permissions: rolePermissions.map(rp => rp.permission_id)
    }));
} catch (error: any) {
    return res.status(500).send(
      createResponse(false, INFO_MSG.errorFetchingById, null, error.message)
    );
}
}

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, permissions } = req.body;

    // Verificar si el rol ya existe
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).send(createResponse(false, INFO_MSG.errorCreating, null, 'Role already exists.'));
    }

    // Verificar que los permisos sean proporcionados
    if (!permissions || permissions.length === 0) {
      return res.status(400).send(createResponse(false, INFO_MSG.errorKeyMissing, null, 'Permissions are required.'));
    }

    // Crear el nuevo rol
    const newRole = new Role({ name });
    await newRole.save();

    // Asociar los permisos al rol
    const rolePermissions = await Promise.all(
      permissions.map(async (permissionId: string) => {
        const permission = await Permission.findById(permissionId);
        if (!permission) {
          throw new Error(`Permission with ID ${permissionId} not found.`);
        }

        const rolePermission = new RolePermission({
          role_id: newRole._id,
          permission_id: permission._id,
        });
        await rolePermission.save();
        return rolePermission;
      })
    );

    return res.status(201).send(createResponse(true, INFO_MSG.successCreating, { role: newRole, rolePermissions }));
  } catch (error: any) {
    return res.status(500).send(createResponse(false, INFO_MSG.errorCreating, null, error.message));
  }
}

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { role_id, permissions } = req.body;

    // Verificar que el rol exista
    const role = await Role.findById(role_id);
    if (!role) {
      return res.status(404).send(
        createResponse(false, INFO_MSG.errorFetching, null, 'Role not found.')
      );
    }

    // Verificar que los permisos sean proporcionados
    if (!permissions || permissions.length === 0) {
      return res.status(400).send(createResponse(false, INFO_MSG.errorKeyMissing, null, 'Permissions are required.'));
    }

    // Verificar que los permisos existan
    const permissionDocs = await Permission.find({ _id: { $in: permissions } });
    if (permissionDocs.length !== permissions.length) {
      return res.status(400).send(createResponse(false, INFO_MSG.errorInvalidKey, null, 'One or more permissions are invalid.'));
    }

    // Eliminar los permisos existentes
    await RolePermission.deleteMany({ role_id: role._id });

    // Asociar los nuevos permisos al rol
    const rolePermissions = await Promise.all(
      permissionDocs.map(async (permission) => {
        const rolePermission = new RolePermission({
          role_id: role._id,
          permission_id: permission._id,
        });
        await rolePermission.save();
        return rolePermission;
      })
    );

    return res.status(200).send(
      createResponse(true, INFO_MSG.successCreating, { role, rolePermissions })
    );
  } catch (error:any ) {
    return res.status(500).send(
      createResponse(false, INFO_MSG.errorCreating, null, error.message)
    );
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).send(
        createResponse(false, INFO_MSG.errorDeleting, null, 'Role not found.')
      );
    }

    await RolePermission.deleteMany({ role_id: role._id });

    return res.status(200).send(
      createResponse(true, INFO_MSG.successDeleting, role)
    );
  } catch (error: any) {
    return res.status(500).send(
      createResponse(false, INFO_MSG.errorDeleting, null, error.message)
    );
  }
}
