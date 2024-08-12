import { Request, Response } from "express";
import { EmployeeValidationSchema, Employee } from "../database/schemas/employee/employee.schema";
import { createResponse } from "../utils/create-response";
import { INFO_MSG } from "../utils/message";



export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await Employee.find({ delete: false });
    res.status(200).send(createResponse(true, INFO_MSG.successFetching, employees));

  } catch (error: any) {
    res.status(500).send(createResponse(false, INFO_MSG.errorFetching, error.message));
  }
}

export const getEmployeeById = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const employee = await Employee.find({ user_id: id, delete: false });

    if (employee) {

      res.status(200).send(createResponse(true, INFO_MSG.successFetching, employee));

    } else {

      res.status(404).send(createResponse(false, INFO_MSG.notFound, ''));

    }

  } catch (error: any) {

    res.status(400).send(createResponse(false, INFO_MSG.errorFetching, error.message));

  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const validatedData = EmployeeValidationSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).send(
        createResponse(
          false,
          INFO_MSG.invalidData,
          validatedData.error.format()
        )
      );

    }

    const { user_id } = validatedData.data;

    // Verificar si el empleado ya existe
    const existingEmployee = await Employee.findOne({ user_id });

    if (existingEmployee) {
      return res.status(400).send(
        createResponse(
          false,
          INFO_MSG.alredyExists
        )
      );
    }

    const employee = new Employee(validatedData.data);
    const savedEmployee = await employee.save();

    res.status(201).send(createResponse(true, INFO_MSG.successCreating, savedEmployee));

  } catch (error: any) {

    res.status(400).send(
      createResponse(false, INFO_MSG.errorCreating, error.message)
    );

  }

}


export const updateEmployee = async (req: Request, res: Response) => {
  try {

    const validatedData = EmployeeValidationSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).send(
        createResponse(
          false,
          INFO_MSG.invalidData,
          validatedData.error.format()
        )
      );

    }

    const { user_id } = validatedData.data;
    const employee = await Employee.findOneAndUpdate(
      { user_id, delete: false },
      validatedData.data,
      { new: true }
    );

    if (employee) {

      res.status(200).send(createResponse(true, INFO_MSG.sucesssUpdating, employee));

    } else {
      res.status(404).send(createResponse(false, INFO_MSG.notFound, ''));
    }

  } catch (error: any) {

    res.status(400).send(createResponse(false, INFO_MSG.errorUpdating, error.message));

  }
};

export const softDeleteEmployee = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    const employee = await Employee.find({ user_id });
    if (!employee) {
      return res.status(404).send(createResponse(false, INFO_MSG.notFound, ''));
    }

    const employeeDeleted = await Employee.findOneAndUpdate(
      { user_id },
      { delete: true, deleted_at: new Date(), restore_at: null },
      { new: true }
    );

    res.status(200).send(createResponse(true, INFO_MSG.successDeleting, employeeDeleted));
  } catch (error: any) {
    res.status(400).send(createResponse(false, INFO_MSG.errorDeleting, error.message));
  }
};


export const restoreEmployee = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    const employee = await Employee.find({ user_id });
    if (!employee) {
      return res.status(404).send(
        createResponse(false, INFO_MSG.notFound, '')
      );
    }

    const employeeRestored = await Employee.findOneAndUpdate(
      { user_id },
      { delete: false, deleted_at: null, restore_at: new Date() },
      { new: true }
    );

    res.status(200).send(createResponse(true, INFO_MSG.successRestoring, employeeRestored));
  } catch (error: any) {
    res.status(400).send(createResponse(false, INFO_MSG.errorRestoring, error.message));
  }
}