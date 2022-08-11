import { Pool } from 'pg';
import { IUser } from '../domain/users';
import { UserRepository } from './users';

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

describe('user repository - getAll success', () => {
  test('should return all users', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: 'Pedro Rocha',
          email: 'pedro_rocha@gmail.com',
          password: '12345678',
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Maria Silva',
          email: 'maria_silva@gmail.com',
          password: '12345678',
          role: 'member',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });
    await UserRepository.getAll();
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - getByID success', () => {
  test('should return a user by ID', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: 'Pedro Rocha',
          email: 'pedro_rocha@gmail.com',
          password: '12345678',
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    await UserRepository.getByID(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - create success', () => {
  test('should create a new user', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockUser: IUser = {
      id: 1,
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      password: '12345678',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    };

    await UserRepository.create(mockUser);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - update success', () => {
  test('should update a user', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockUser: IUser = {
      id: 1,
      name: 'Pedro Rocha',
      role: 'admin',
    };

    await UserRepository.update(mockUser);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - remove success', () => {
  test('should remove a user', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    await UserRepository.remove(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});
