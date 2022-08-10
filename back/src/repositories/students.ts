import { IStudent, IStudentRepository } from '../domain/students';
import ResourceNotFoundError from '../domain/errors/resource-not-found';
import { postgres } from '../config/database';

async function getAll(): Promise<IStudent[]> {
  try {
    const result = await postgres.query(
      `SELECT 
         id, 
         name, 
         email, 
         academic_record, 
         social_security_number, 
         created_at, 
         updated_at 
        FROM students
        ORDER BY id DESC
        LIMIT 100
        `,
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IStudent> {
  try {
    const result = await postgres.query(
      `SELECT 
          id, 
          name, 
          email, 
          academic_record, 
          social_security_number, 
          created_at, 
          updated_at 
       FROM students
       WHERE id = $1`,
      [id],
    );

    if (!result.rows[0]) throw new ResourceNotFoundError('ID not found');

    return result.rows[0] as IStudent;
  } catch (err) {
    throw err;
  }
}

async function create(student: IStudent): Promise<void> {
  try {
    await postgres.query(
      `INSERT INTO students (
         name, 
         email, 
         academic_record, 
         social_security_number
        ) 
       VALUES($1, $2, $3, $4)`,
      [student.name, student.email, student.academic_record, student.social_security_number],
    );
  } catch (err) {
    throw err;
  }
}

async function update(student: IStudent): Promise<void> {
  try {
    const updated_at = new Date();

    await postgres.query(
      `UPDATE students
       SET
        name  = $1,
        email = $2,
        updated_at = $3
       WHERE id = $4
      `,
      [student.name, student.email, updated_at, student.id],
    );
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await postgres.query('DELETE FROM students WHERE id = $1', [id]);
  } catch (err) {
    throw err;
  }
}

export async function checkSocialSecurityNumber(ssn: string): Promise<boolean> {
  try {
    const result = await postgres.query('SELECT FROM students WHERE social_security_number = $1', [
      ssn,
    ]);
    if (!result.rows[0]) return false;
    return true;
  } catch (err) {
    throw err;
  }
}

export async function checkAcademicRecord(ar: string): Promise<boolean> {
  try {
    const result = await postgres.query('SELECT FROM students WHERE academic_record = $1', [ar]);
    if (!result.rows[0]) return false;
    return true;
  } catch (err) {
    throw err;
  }
}

export const StudentRepository: IStudentRepository = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
