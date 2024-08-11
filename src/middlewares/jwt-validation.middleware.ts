import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { INFO_MSG } from '../utils/message';
import config from '../config';

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const validateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: INFO_MSG.tokenNotFound
    });
  }

  try {
    const secretKey = config.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(token, secretKey);
    req.body.decoded = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: INFO_MSG.errorInvalidKey
    });
  }
};
