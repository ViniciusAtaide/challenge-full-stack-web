import { IUser, IUserService } from '../domain/users';
import { UserRepository } from '../repositories/users';
import EmailError from '../domain/errors/email';

async function getAll(): Promise<IUser[]> {
  try {
    return await UserRepository.getAll();
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IUser> {
  try {
    return await UserRepository.getByID(id);
  } catch (err) {
    throw err;
  }
}

async function create(user: IUser): Promise<void> {
  try {
    const emailExists = await UserRepository.checkEmail(String(user.email));
    if (emailExists) throw new EmailError('This email already exists');

    await UserRepository.create(user);
  } catch (err) {
    throw err;
  }
}

async function update(user: IUser): Promise<void> {
  try {
    await UserRepository.getByID(Number(user?.id));
    await UserRepository.update(user);
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await UserRepository.getByID(id);
    await UserRepository.remove(id);
  } catch (err) {
    throw err;
  }
}

export const UserService: IUserService = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
