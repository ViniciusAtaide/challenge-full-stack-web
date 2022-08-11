import Joi from 'joi';
import { ICreateStudent, IUpdateStudent } from 'domain/students';

export const createStudentSchema = Joi.object<ICreateStudent>({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  academic_record: Joi.string().required(),
  social_security_number: Joi.string().min(11).max(11).required(),
}).meta({ className: "ICreateStudent" });

export const udpateStudentSchema = Joi.object<IUpdateStudent>({
  id: Joi.number().required(),
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  updated_at: Joi.date(),
}).meta({ className: "IUpdateStudent" });
