import { createPermission, deletePermission, getPermissions, updatePermission } from './permission.controller'

import { createRole, deleteRole, getRoles, updateRole, getRoleById } from './roles.controller'



const SystemConfig ={
    createPermission,
    deletePermission,
    getPermissions,
    updatePermission,
    createRole,
    deleteRole,
    updateRole,
    getRoles,
    getRoleById
}


export default SystemConfig;