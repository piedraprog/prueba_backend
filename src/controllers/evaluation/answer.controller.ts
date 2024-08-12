import { Request, Response } from 'express'
import { Answers } from '../../database/schemas/evaluation/answer.schema';
import { createResponse } from '../../utils/create-response';
import { INFO_MSG } from '../../utils/message';


export const getAnswersByEvaluationId = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const evaluations = await Answers.find({ evaluation_id: id });
    res.status(200).send(
      createResponse(false, INFO_MSG.successFetching, evaluations)
    );
  } catch (error: any) {
    return res.status(400).send(createResponse(false, INFO_MSG.errorFetching, error.message));
  }
}
