import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { INFO_MSG } from '../utils/message';

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
        const secretKey = process.env.JWT_SECRET_KEY as string; // Asegúrate de tener la clave secreta en las variables de entorno
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: INFO_MSG.errorInvalidKey
        });
    }
};
