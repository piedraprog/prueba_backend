import mongoose from 'mongoose';
import { Permission } from '../database/schemas/permission.schema';
import { RolePermission } from '../database/schemas/role-permission.schema';
import { Role } from '../database/schemas/role.schema';
import config from '../config';
import { User } from '../database/schemas/user.schema';
import { UserRole } from '../database/schemas/user-role.schema';
import bcrypt from 'bcrypt';

// Configura la conexión a la base de datos
mongoose.connect(config.MONGO_URL, {});

const initialize = async () => {
  try {
    // Crear permisos
    const readPermission = new Permission({ name: 'read' });
    const writePermission = new Permission({ name: 'write' });
    const deletePermission = new Permission({ name: 'delete' });

    await readPermission.save();
    await writePermission.save();
    await deletePermission.save();

    console.log('Permissions created successfully.');

    // Obtener los permisos recién creados
    const permissions = await Permission.find({ name: { $in: ['read', 'write', 'delete'] } });

    // Crear roles
    const adminRole = new Role({ name: 'admin' });
    const managerRole = new Role({ name: 'manager' });
    const employeeRole = new Role({ name: 'employee' });

    await adminRole.save();
    await managerRole.save();
    await employeeRole.save();

    console.log('Roles created successfully.');

    // Obtener los roles recién creados
    const roles = await Role.find({ name: { $in: ['admin', 'manager', 'employee'] } });

    // Asignar permisos a roles
    const rolePermissions = [
        // Admin role has all permissions
        { role_id: roles.find(role => role.name === 'admin')!._id, permission_id: permissions.find(permission => permission.name === 'read')!._id },
        { role_id: roles.find(role => role.name === 'admin')!._id, permission_id: permissions.find(permission => permission.name === 'write')!._id },
        { role_id: roles.find(role => role.name === 'admin')!._id, permission_id: permissions.find(permission => permission.name === 'delete')!._id },

        // Manager role has read and write permissions
        { role_id: roles.find(role => role.name === 'manager')!._id, permission_id: permissions.find(permission => permission.name === 'read')!._id },
        { role_id: roles.find(role => role.name === 'manager')!._id, permission_id: permissions.find(permission => permission.name === 'write')!._id },

        // Employee role has only read permission
        { role_id: roles.find(role => role.name === 'employee')!._id, permission_id: permissions.find(permission => permission.name === 'read')!._id }
    ];

    await RolePermission.insertMany(rolePermissions);

    console.log('Role permissions set successfully.');

    // Crear un usuario admin
    const password = "123456";
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    const adminUser = new User({
        first_name: 'José',
        last_name: 'Piedra',
        email: 'jose.piedra@example.com',
        password_hash: password_hash,
        created_at: new Date(),
        updated_at: new Date()
    });

    await adminUser.save();

    console.log('Admin user created successfully.');

    // Obtener el usuario y el rol admin
    const user = await User.findOne({ email: 'jose.piedra@example.com' });
    const adminRoleId = roles.find(role => role.name === 'admin')!._id;

    if (user) {
        const userRole = new UserRole({
            user_id: user._id,
            role_id: adminRoleId,
            created_at: new Date(),
            updated_at: new Date()
        });

        await userRole.save();
        console.log('User-role association created successfully.');
    } else {
        console.error('Admin user not found after creation.');
    }

    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
} catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
}
};

// Ejecutar el script de inicialización
initialize();
