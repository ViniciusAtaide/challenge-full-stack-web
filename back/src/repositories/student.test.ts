import { Pool } from 'pg';
import { IStudent } from '../domain/students';
import { StudentRepository } from './students';

jest.mock('pg', () => {
  const mPool = {
    connect: function () {
      return { query: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

let pool: any;
beforeEach(() => {
  pool = new Pool();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('student repository - getAll success', () => {
  test('should return all students', async () => {
    pool.query.mockResolvedValue({
      rows: [
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
      ],
    });
    await StudentRepository.getAll();
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('student repository - getByID success', () => {
  test('should return a student by ID', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: 'Pedro Rocha',
          email: 'pedro_rocha@gmail.com',
          academic_record: '12345',
          social_security_number: '11122233344',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    await StudentRepository.getByID(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('student repository - create success', () => {
  test('should create a new student', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockStudent: IStudent = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      academic_record: '12345',
      social_security_number: '11122233344',
    };

    await StudentRepository.create(mockStudent);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('student repository - update success', () => {
  test('should update a student', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockStudent: IStudent = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
    };

    await StudentRepository.update(mockStudent);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('student repository - remove success', () => {
  test('should remove a student', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    await StudentRepository.remove(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});
