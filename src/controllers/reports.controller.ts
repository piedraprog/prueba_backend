import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Evaluation } from '../database/schemas/evaluation/evaluation.schema';
import { createResponse } from '../utils/create-response';
import { INFO_MSG } from '../utils/message';
import { Answers } from '../database/schemas/evaluation/answer.schema';

export const getEvaluationReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar si la evaluación existe
    const evaluation = await Evaluation.findById(id);
    if (!evaluation) {
      return res.status(404).send(
        createResponse(false, INFO_MSG.errorFetching, null, 'Evaluation not found')
      );
    }
    const answersReport = await Answers.find({ "evaluation_id": id })
      .populate('evaluation_id', 'title')
      .populate('answers.question_id', 'text');

    if (answersReport.length === 0) {
      return res.status(404).send(createResponse(false, INFO_MSG.errorFetching, null, 'No answers found for this evaluation'));
    }

    // const answersReport = await Answers.aggregate([
    //   {
    //     $lookup: {
    //       from: 'employees',
    //       localField: 'employee_id',
    //       foreignField: '_id',
    //       as: 'employee'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'evaluations',
    //       localField: 'evaluation_id',
    //       foreignField: '_id',
    //       as: 'evaluation'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'questions',
    //       localField: 'answers.question_id',
    //       foreignField: '_id',
    //       as: 'questions'
    //     }
    //   },
    //   {
    //     $unwind: '$employee'
    //   },
    //   {
    //     $unwind: '$evaluation'
    //   },
    //   {
    //     $unwind: '$answers'
    //   },
    //   {
    //     $unwind: '$questions'
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       'Employee Name': '$employee.name',
    //       'Evaluation Title': '$evaluation.title',
    //       'Question': '$questions.text',
    //       'Answer': '$answers.value'
    //     }
    //   }
    // ]);

    const dataForExcel = answersReport.flatMap((answerSet: any) =>
      answerSet.answers.map((answer: any) => ({
        'Evaluation Title': answerSet.evaluation_id?.title || 'N/A',
        'Question': answer.question_id?.text || 'N/A',
        'Answer': answer.value
      }))
    );

    if (!answersReport.length) {
      return res.status(404).json(createResponse(false, INFO_MSG.notFound, false));
    }

    // Retornar el reporte generado
    return res.status(200).send(createResponse(true, INFO_MSG.successFetching, dataForExcel));
  } catch (error: any) {
    return res.status(500).send(createResponse(false, INFO_MSG.errorFetching, null, error.message));
  }
};
