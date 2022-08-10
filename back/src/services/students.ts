import { IStudent, IStudentService } from '../domain/students';
import {
  StudentRepository,
  checkSocialSecurityNumber,
  checkAcademicRecord,
} from '../repositories/students';
import SocialSecurityError from '../domain/errors/social-security-number';

async function getAll(): Promise<IStudent[]> {
  try {
    return await StudentRepository.getAll();
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IStudent> {
  try {
    return await StudentRepository.getByID(id);
  } catch (err) {
    throw err;
  }
}

async function create(student: IStudent): Promise<void> {
  try {
    const ssnExists = await checkSocialSecurityNumber(student.social_security_number);
    if (ssnExists) throw new SocialSecurityError('This social security number already exists');

    const arExists = await checkAcademicRecord(student.academic_record);
    if (arExists) throw new SocialSecurityError('This academic record already exists');

    await StudentRepository.create(student);
  } catch (err) {
    throw err;
  }
}

async function update(student: IStudent): Promise<void> {
  try {
    await StudentRepository.getByID(Number(student?.id));
    await StudentRepository.update(student);
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await StudentRepository.getByID(id);
    await StudentRepository.remove(id);
  } catch (err) {
    throw err;
  }
}

export const StudentService: IStudentService = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
