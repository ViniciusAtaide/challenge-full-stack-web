import Joi from 'joi';
import { IUser } from 'domain/users';

export const createUserSchema = Joi.object<IUser>({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
  role: Joi.string().valid('admin', 'member').required(),
});

export const updateUserSchema = Joi.object<IUser>({
  id: Joi.number().required(),
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid('admin', 'member').required(),
  updated_at: Joi.date(),
});
