import { IUser } from 'domain/users';
import { Request, Response } from 'express';
import { createUserSchema, updateUserSchema } from '../../validation/users';
import { UserService } from '../../services/users';
import ValidationError from '../../domain/errors/validation';
import { EHTTP } from '../../enums/http-status-code';
import bcrypt from 'bcryptjs';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await UserService.getAll();
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err) {
    return res.json(err);
  }
};

export const getByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await UserService.getByID(+id);
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err) {
    return res.json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const validation = createUserSchema.validate(req.body);
    if (validation.error?.message) {
      throw new ValidationError(validation.error?.message);
    }

    const user: IUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    await UserService.create(user);
    return res.status(EHTTP.StatusCreated).json({ message: 'Created' });
  } catch (err) {
    return res.json(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = {
      ...req.body,
      id: +id,
    } as IUser;

    const validation = updateUserSchema.validate(user);
    if (validation.error?.message) {
      throw new ValidationError(validation.error?.message);
    }

    await UserService.update(user);
    return res.status(EHTTP.StatusOK).json({ message: 'Updated' });
  } catch (err) {
    return res.json(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await UserService.remove(+id);
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
