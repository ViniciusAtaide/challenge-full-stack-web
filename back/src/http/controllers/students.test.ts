import { IStudent } from '../../domain/students';
import { StudentService } from '../../services/students';
import StudentController from './students';

describe('student controller - getAll success', () => {
  test('should return all students', async () => {
    const mockStudents: IStudent[] = [
      {
        id: 1,
        name: 'Pedro Rocha',
        email: 'pedro_rocha@gmail.com',
        academic_record: '12345',
        social_security_number: '11122233344',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Maria Silva',
        email: 'maria_silva@gmail.com',
        academic_record: '89123415',
        social_security_number: '11122232143',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    StudentService.getAll = jest.fn(() => Promise.resolve(mockStudents));

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await StudentController.getAll(req, res);

    expect(StudentService.getAll).toBeCalledTimes(1);
  });
});

describe('student controller - getByID success', () => {
  test('should return a student by id', async () => {
    const mockStudent: IStudent = {
      id: 1,
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      academic_record: '12345',
      social_security_number: '11122233344',
      created_at: new Date(),
      updated_at: new Date(),
    };

    StudentService.getByID = jest.fn(() => Promise.resolve(mockStudent));

    const req: any = { params: { id: 1 } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await StudentController.getByID(req, res);

    expect(StudentService.getByID).toBeCalledTimes(1);
  });
});

describe('student controller - create success', () => {
  test('should create a new student', async () => {
    StudentService.create = jest.fn(() => Promise.resolve());

    const req: any = {
      body: {
        name: 'Pedro Rocha',
        email: 'pedro_rocha@gmail.com',
        academic_record: '12345',
        social_security_number: '11122233344',
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await StudentController.create(req, res);

    expect(StudentService.create).toBeCalledTimes(1);
  });
});

describe('student controller - update success', () => {
  test('should update a student', async () => {
    StudentService.update = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
      body: {
        name: 'Pedro Rocha',
        email: 'pedro_rocha@gmail.com',
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await StudentController.update(req, res);

    expect(StudentService.update).toBeCalledTimes(1);
  });
});

describe('student controller - remove success', () => {
  test('should remove a student', async () => {
    StudentService.remove = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await StudentController.remove(req, res);

    expect(StudentService.remove).toBeCalledTimes(1);
  });
});
