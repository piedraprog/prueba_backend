import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../database/schemas/user.schema';
import { z, ZodError } from 'zod';
import { UserSession } from '../database/schemas/user-session.schema';
import crypto from 'crypto';
import config from '../config';
import { createResponse } from '../utils/create-response';
import { Role } from '../database/schemas/role.schema';
import { INFO_MSG } from '../utils/message';
import { UserRole } from '../database/schemas/user-role.schema';

const LoginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const register = async (req: Request, res: Response) => {
  try {
    const { 
      first_name, 
      last_name, 
      email, 
      password, 
      role_id 
    } = req.body;

    // Verificar si el rol existe
    const role = await Role.findById(role_id);
    if (!role) {
      return res.status(404).send(
        createResponse(false, INFO_MSG.errorFetching, null, 'Role not found.')
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send(createResponse(false, INFO_MSG.errorCreating, null, 'User already exists.'));
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear el usuario
    const newUser = new User({
      first_name,
      last_name,
      email,
      password_hash,
    });
    await newUser.save();

    // Asignar el rol al usuario en la organización
    const userOrgRole = new UserRole({
      user_id: newUser._id,
      role_id: role._id,
    });
    await userOrgRole.save();

    // Respuesta exitosa
    return res.status(201).send(
      createResponse(true, INFO_MSG.successCreating, {
        user: newUser,
        role: role.name,
      })
    );

  } catch (error: any) {
    return res.status(500).send(
      createResponse(false, INFO_MSG.errorCreating, null, error.message)
    );
  }
};


export const login = async (req: Request, res: Response) => {
  try {

    const parsedData = LoginValidationSchema.parse(req.body);

    // Verificar si el usuario existe
    const user = await User.findOne({ email: parsedData.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(parsedData.password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generar tokens
    const accessToken = jwt.sign({ user_id: user._id }, config.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });

    //Generar un token de refresco seguro
    const refreshToken = crypto.randomBytes(64).toString('hex');


    // Guardar el token de refresco en la base de datos
    const userSession = new UserSession({
      expires_at: new Date(Date.now() + 1000), // Expira en 30 días
      user_id: user._id,
      refresh_token: refreshToken
    });

    await userSession.save();

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
};


export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token, access_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const secretKey = config.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(access_token, secretKey) as JwtPayload;

    // Verificar el token de refresco
    const userSession = await UserSession.findOne({ refresh_token, user_id: decoded['user_id'] });
    if (!userSession) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verificar si el token de refresco ha expirado
    if (userSession.expires_at < new Date()) {
      return res.status(403).json({ message: 'Refresh token has expired' });
    }

    // Generar un nuevo token de acceso
    const accessToken = jwt.sign({ user_id: userSession.user_id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });

    res.json({ accessToken });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
};