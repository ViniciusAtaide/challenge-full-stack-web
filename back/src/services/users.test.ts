import { IUser } from '../domain/users';
import { UserService } from './users';
import { UserRepository } from '../repositories/users';

describe('user service - getAll success', () => {
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

    UserRepository.getAll = jest.fn(() => Promise.resolve(mockUsers));

    const res = await UserService.getAll();

    expect(res[0].name).toBe('Pedro Rocha');

    expect(UserRepository.getAll).toBeCalledTimes(1);
  });
});

describe('user service - getAll failure', () => {
  test('should fail to return all users', async () => {
    UserRepository.getAll = jest.fn(() => {
      throw new Error('failed to retrieve the users');
    });

    try {
      await UserService.getAll();
    } catch (err: any) {
      expect(err.message).toEqual('failed to retrieve the users');
    }
  });
});

describe('user service - getByID success', () => {
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

    UserRepository.getByID = jest.fn(() => Promise.resolve(mockUser));

    const res = await UserService.getByID(1);

    expect(res.name).toBe('Pedro Rocha');

    expect(UserRepository.getByID).toBeCalledTimes(1);
  });
});

describe('user service - getByID failure', () => {
  test('should fail to return a user by id', async () => {
    UserRepository.getByID = jest.fn(() => {
      throw new Error('failed to retrieve the user');
    });

    try {
      await UserService.getByID(1);
    } catch (err: any) {
      expect(err.message).toEqual('failed to retrieve the user');
    }
  });
});

describe('user service - create success', () => {
  test('should create a new user', async () => {
    const mockUser: IUser = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      password: '12345678',
      role: 'admin',
    };

    UserRepository.checkEmail = jest.fn(() => Promise.resolve(false));
    UserRepository.create = jest.fn(() => Promise.resolve());

    await UserService.create(mockUser);

    expect(UserRepository.create).toBeCalledTimes(1);
  });
});

describe('user service - create failure', () => {
  test('should fail to create a new user', async () => {
    const mockUser: IUser = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      password: '12345678',
      role: 'admin',
    };

    UserRepository.create = jest.fn(() => {
      throw new Error('failed to create the user');
    });

    try {
      await UserService.create(mockUser);
    } catch (err: any) {
      expect(err.message).toEqual('failed to create the user');
    }
  });
});

describe('user service - update success', () => {
  test('should update a user', async () => {
    const mockUser: IUser = {
      name: 'Pedro Rocha',
      role: 'admin',
    };

    UserRepository.getByID = jest.fn(() => Promise.resolve(mockUser));
    UserRepository.update = jest.fn(() => Promise.resolve());

    await UserService.update(mockUser);

    expect(UserRepository.update).toBeCalledTimes(1);
  });
});

describe('user service - update failure', () => {
  test('should fail to update a user', async () => {
    const mockUser: IUser = {
      name: 'Pedro Rocha',
      role: 'admin',
    };

    UserRepository.update = jest.fn(() => {
      throw new Error('failed to update the user');
    });

    try {
      await UserService.update(mockUser);
    } catch (err: any) {
      expect(err.message).toEqual('failed to update the user');
    }
  });
});

describe('user service - remove success', () => {
  test('should remove a user', async () => {
    const mockUser: IUser = {
      id: 1,
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      password: '12345678',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    };

    UserRepository.getByID = jest.fn(() => Promise.resolve(mockUser));
    UserRepository.remove = jest.fn(() => Promise.resolve());

    await UserService.remove(1);

    expect(UserRepository.remove).toBeCalledTimes(1);
  });
});

describe('user service - remove failure', () => {
  test('should fail to remove a user', async () => {
    UserRepository.remove = jest.fn(() => {
      throw new Error('failed to remove the user');
    });

    try {
      await UserService.remove(1);
    } catch (err: any) {
      expect(err.message).toEqual('failed to remove the user');
    }
  });
});
