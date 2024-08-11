
import { NextFunction, Request, response } from 'express';
import config from '../config';
import { INFO_MSG } from '../utils/message';

const ALLOWEDHOST = config.HOST;

export const accessValidation = (req: Request, res: Response, next: NextFunction) => {
    // if (!ALLOWEDHOST.includes(req.get('origin')) && req.method === 'POST' || req.method === 'DELETE') {
    //     return res.status(401).json({ message: INFO_MSG.unauthorized });
    // } else {
        next();
    // }
};
