import { Request, Response } from 'express';
import { createResponse } from '../../utils/create-response';
import { INFO_MSG } from '../../utils/message';
import { Question, QuestionValidationSchema } from '../../database/schemas/evaluation/question.schema';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const validateBody = await QuestionValidationSchema.safeParse(req.body);
    if (!validateBody.success) {
      return res.status(400).send(
        createResponse(
          false,
          INFO_MSG.invalidData,
          validateBody.error.format()
        )
      );
    }

    const question = new Question(validateBody.data);
    const savedQuestion = await question.save();
    return res.status(200).send(createResponse(true, INFO_MSG.successCreating, savedQuestion));

  } catch (error: any) {
    return res.status(400).send(createResponse(false, INFO_MSG.errorCreating, error.message));
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validateBody = await QuestionValidationSchema.safeParse(req.body);

    if (!validateBody.success) {
      return res.status(400).send(
        createResponse(
          false,
          INFO_MSG.invalidData,
          validateBody.error.format()
        )
      );
    }

    const question = await Question.findByIdAndUpdate(id, validateBody.data, {
      new: true,
    });

    return res.status(200).send(createResponse(true, INFO_MSG.sucesssUpdating, question));

  } catch (error: any) {

    return res.status(400).send(createResponse(false, INFO_MSG.errorUpdating, error.message));

  }
};

export const getQuestions = async (_req: Request, res: Response) => {
  try {
    const evaluations = await Question.find();
    res.status(200).send(
      createResponse(false, INFO_MSG.successFetching, evaluations)
    );
  } catch (error: any) {
    return res.status(400).send(createResponse(false, INFO_MSG.errorFetching, error.message));
  }
};