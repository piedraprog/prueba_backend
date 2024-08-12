import { Request, Response } from 'express';
import { Evaluation, EvaluationValidationSchema } from '../../database/schemas/evaluation/evaluation.schema';
import { createResponse } from '../../utils/create-response';
import { INFO_MSG } from '../../utils/message';
import { Answers, AnswersValidationSchema } from '../../database/schemas/evaluation/answer.schema';


export const createEvaluation = async (req: Request, res: Response) => {

  try {
    // Validación de los datos de entrada
    const validatedData = EvaluationValidationSchema.parse(req.body);
    if (!validatedData) {
      return res.status(400).send(createResponse(false, INFO_MSG.invalidData, ''));
    }

    const { title, description, due_date, question_ids } = validatedData;
    const created_by = req.body.user_id;

    // Crea la evaluación
    const newEvaluation = new Evaluation({
      title,
      description,
      created_by,
      due_date: new Date(due_date),
      questions_ids: question_ids
    });

    // Guardar la evaluación para obtener su ID
    const savedEvaluation = await newEvaluation.save();

    res.status(201).send(
      createResponse(
        true,
        INFO_MSG.successCreating,
        savedEvaluation
      )
    );
  } catch (error: any) {
    res.status(400).send(
      createResponse(false, INFO_MSG.errorCreating, error.message)
    );
  }
};

export const getEvaluations = async (_req: Request, res: Response) => {

  try {
    const evaluations = await Evaluation.find().populate('created_by');
    res.status(200).send(
      createResponse(false, INFO_MSG.successFetching, evaluations)
    );
  } catch (error: any) {
    res.status(400).send(createResponse(false, INFO_MSG.errorFetching, error.message));
  }
}

export const getEvaluationById = async (req: Request, res: Response) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (evaluation) {
      res.status(200).send(createResponse(true, 'Evaluation fetched successfully', evaluation));
    } else {
      res.status(404).send(createResponse(false, 'Evaluation not found', ''));
    }
  } catch (error: any) {
    res.status(400).send(createResponse(false, 'Error fetching evaluation', error.message));
  }
};

export const updateEvaluation = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    console.log(id)
    if(!id) {
      return res.status(400).send(
        createResponse(false, INFO_MSG.errorKeyMissing, 'id missing in request params')
      );
    }

    const validatedData = EvaluationValidationSchema.parse(req.body);
    if (!validatedData || !id) {
      return res.status(400).send(
        createResponse(false, INFO_MSG.invalidData, '')
      );
    }

    const evaluation = await Evaluation.findByIdAndUpdate(id, validatedData, { new: true });

    if (evaluation) {
      res.status(200).send(createResponse(true, INFO_MSG.sucesssUpdating, evaluation));
    } else {
      res.status(404).send(createResponse(false, INFO_MSG.notFound, ''));
    }

  } catch (error: any) {

    res.status(400).send(createResponse(false, INFO_MSG.errorUpdating, error.message));

  }
};


export const submitEvaluation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question_answers, evaluation_id } = req.body;

    const theJson = {
      employee_id: id,
      evaluation_id,
      answers: question_answers
    }
    
    const validation = AnswersValidationSchema.safeParse(theJson);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => err.message).join(', ');
      return res.status(400).send(
        createResponse(false, INFO_MSG.errorCreating, null, errors)
      );
    }

    
    // Validacion si ya esta respondido una evaluacion
    const evaluation = await Answers.find({ employee_id: id, evaluation_id });
    if (evaluation.length > 0) {
      return res.status(404).send(
        createResponse(false, INFO_MSG.alredyExists, null, 'Evaluation responded already')
      );
    }

    const { employee_id, answers } = validation.data;

    // Guardar cada respuesta en la base de datos
    const savedAnswers = await Answers.create({
      employee_id,
      answers,
      evaluation_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.status(201).send(
      createResponse(true, INFO_MSG.successCreating, savedAnswers)
    );

  } catch (error: any) {

    return res.status(500).send(
      createResponse(false, INFO_MSG.errorCreating, null, error.message)
    );

  }
}
