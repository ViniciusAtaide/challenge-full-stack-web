import { IUser, IUserRepository } from '../domain/users';
import ResourceNotFoundError from '../domain/errors/resource-not-found';
import { postgres } from '../config/database';

async function getAll(): Promise<IUser[]> {
  try {
    const result = await postgres.query(
      `SELECT 
        id, 
        name, 
        email,
        role,
        created_at, 
        updated_at 
       FROM users`,
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IUser> {
  try {
    const result = await postgres.query(
      `SELECT 
          id, 
          name, 
          email,
          role,
          created_at, 
          updated_at 
       FROM users
       WHERE id = $1
       ORDER BY id DESC
       LIMIT 100
          `,
      [id],
    );

    if (!result.rows[0]) throw new ResourceNotFoundError('ID not found');

    return result.rows[0] as IUser;
  } catch (err) {
    throw err;
  }
}

async function create(user: IUser): Promise<void> {
  try {
    await postgres.query(
      `INSERT INTO users (
        name, 
        email, 
        password,
        role
        ) 
       VALUES($1, $2, $3, $4)`,
      [user.name, user.email, user.password, user.role],
    );
  } catch (err) {
    throw err;
  }
}

async function update(user: IUser): Promise<void> {
  try {
    const updated_at = new Date();

    await postgres.query(
      `UPDATE users
       SET
        name  = $1,
        role = $2,
        updated_at = $3
       WHERE id = $4
      `,
      [user.name, user.role, updated_at, user.id],
    );
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await postgres.query('DELETE FROM users WHERE id = $1', [id]);
  } catch (err) {
    throw err;
  }
}

export async function checkEmail(email: string): Promise<boolean> {
  try {
    const result = await postgres.query('SELECT email FROM users WHERE email = $1', [email]);
    if (!result.rows[0]) return false;
    return true;
  } catch (err) {
    throw err;
  }
}

export const UserRepository: IUserRepository = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
