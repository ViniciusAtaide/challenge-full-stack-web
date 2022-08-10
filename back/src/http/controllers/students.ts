import { IStudent } from 'domain/students';
import { Request, Response } from 'express';
import { createStudentSchema, udpateStudentSchema } from '../../validation/students';
import { StudentService } from '../../services/students';
import ValidationError from '../../domain/errors/validation';
import { EHTTP } from '../../enums/http-status-code';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await StudentService.getAll();
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err) {
    return res.json(err);
  }
};

export const getByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await StudentService.getByID(+id);
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err) {
    return res.json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const student = req.body as IStudent;

    const validation = createStudentSchema.validate(student);
    if (validation.error?.message) {
      throw new ValidationError(validation.error?.message);
    }

    await StudentService.create(student);
    return res.status(EHTTP.StatusCreated).json({ message: 'Created' });
  } catch (err) {
    return res.json(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = {
      ...req.body,
      id: +id,
    } as IStudent;

    const validation = udpateStudentSchema.validate(student);
    if (validation.error?.message) {
      throw new ValidationError(validation.error?.message);
    }

    await StudentService.update(student);
    return res.status(EHTTP.StatusOK).json({ message: 'Updated' });
  } catch (err) {
    return res.json(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await StudentService.remove(+id);
    return res.status(EHTTP.StatusOK).send({ message: 'Removed' });
  } catch (err) {
    return res.send(err);
  }
};

export default {
  getAll,
  getByID,
  create,
  update,
  remove,
};
