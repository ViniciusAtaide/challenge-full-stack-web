import { IUser } from '../../domain/users';
import { UserService } from '../../services/users';
import UserController from './users';

describe('user controller - getAll success', () => {
  test('should return all users', async () => {
    const mockUsers: IUser[] = [
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
    ];

    UserService.getAll = jest.fn(() => Promise.resolve(mockUsers));

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await UserController.getAll(req, res);

    expect(UserService.getAll).toBeCalledTimes(1);
  });
});

describe('user controller - getByID success', () => {
  test('should return a user by id', async () => {
    const mockUser: IUser = {
      id: 1,
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      password: '12345678',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    };

    UserService.getByID = jest.fn(() => Promise.resolve(mockUser));

    const req: any = { params: { id: 1 } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await UserController.getByID(req, res);

    expect(UserService.getByID).toBeCalledTimes(1);
  });
});

describe('user controller - create success', () => {
  test('should create a new user', async () => {
    UserService.create = jest.fn(() => Promise.resolve());

    const req: any = {
      body: {
        name: 'Pedro Rocha',
        email: 'pedro_rocha@gmail.com',
        password: '12345678',
        role: 'admin',
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await UserController.create(req, res);

    expect(UserService.create).toBeCalledTimes(1);
  });
});

describe('user controller - update success', () => {
  test('should update a user', async () => {
    UserService.update = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
      body: {
        name: 'Pedro Rocha',
        role: 'admin',
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await UserController.update(req, res);

    expect(UserService.update).toBeCalledTimes(1);
  });
});

describe('user controller - remove success', () => {
  test('should remove a user', async () => {
    UserService.remove = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await UserController.remove(req, res);

    expect(UserService.remove).toBeCalledTimes(1);
  });
});
