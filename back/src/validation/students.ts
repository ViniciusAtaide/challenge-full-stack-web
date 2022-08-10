import Joi from 'joi';
import { IStudent } from 'domain/students';

export const studentSchema = Joi.object<IStudent>({
  id: Joi.number(),
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  academic_record: Joi.string().required(),
  social_security_number: Joi.string().min(11).max(11).required(),
  updated_at: Joi.date(),
});
