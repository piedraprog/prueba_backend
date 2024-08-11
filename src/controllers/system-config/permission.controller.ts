import { Request, Response } from "express";
import { IPermission, Permission, PermissionValidationSchema } from "../../database/schemas/permission.schema";
import { createResponse } from "../../utils/create-response";
import { INFO_MSG } from "../../utils/message";



export const getPermissions = async (_req: Request, res: Response) => {
  try {

    const permissions = await Permission.find();
    res.status(200).send(createResponse(
      true, 
      INFO_MSG.successFetching, 
      permissions));

  } catch (error: any) {

    res.status(500).send(createResponse(
      false, 
      INFO_MSG.errorFetching, 
      error.message));

  }
}


export const createPermission = async (req: Request, res: Response) => {
  try {
    // Validar los datos de entrada
    const validationResult = PermissionValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).send(
        createResponse(
          false,
          INFO_MSG.invalidData,
          validationResult.error.format()
        ))
    }

    const { name } = validationResult.data;

    // Verificar si el permiso ya existe
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).send(
        createResponse(
          false,
          INFO_MSG.alredyExists
        )
      );
    }

    // Crear un nuevo permiso
    const newPermission: IPermission = new Permission({ name });
    await newPermission.save();

    res.status(201).send(
      createResponse(
        true,
        INFO_MSG.successCreating,
        newPermission
      )
    );

  } catch (error: any) {

    res.status(500).send(
      createResponse(
        false,
        INFO_MSG.errorCreating,
        error.message
      )
    )
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const { name, id } = req.body;

    // Validar los datos de entrada
    const validationResult = PermissionValidationSchema.safeParse({ name });
    if (!validationResult.success) {
      return res.status(400).json(
        createResponse(
          false, 
          INFO_MSG.invalidData, 
          validationResult.error.format()
        ) 
      );
    }

    // Buscar el permiso por ID
    const permission = await Permission.findById(id);
    if (!permission) {
      return res.status(404).send(
        createResponse(
          false,
          INFO_MSG.notFound,
        )
      );
    }

    // Actualizar el permiso
    permission.name = name;
    await permission.save();

    res.status(200).send(
      createResponse(
        true,
        INFO_MSG.sucesssUpdating,
        permission
      )
    )
  } catch (error: any) {
    res.status(500).send(
      createResponse(
        false,
        INFO_MSG.errorCreating,
        error.message
      )
    )
  }
}

export const deletePermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const permission = await Permission.findById(id);
    
    if (!permission) {
      return res.status(404).send(
        createResponse(
          false,
          INFO_MSG.notFound
        )
      );
    }

    // Eliminar el permiso
    const deletedPermission = await Permission.findByIdAndDelete(id);

    res.status(200).send(
      createResponse(
        true,
        INFO_MSG.successDeleting,
        deletedPermission
      )
    )
  } catch (error: any) {
    res.status(500).send(
      createResponse(
        false,
        INFO_MSG.errorCreating,
        error.message
      )
    )
  }
}


