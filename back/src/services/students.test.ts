import { IStudent } from '../domain/students';
import { StudentService } from './students';
import { StudentRepository } from '../repositories/students';

describe('getAll success', () => {
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

    StudentRepository.getAll = jest.fn(() => Promise.resolve(mockStudents));

    const res = await StudentService.getAll();

    expect(res[0].name).toBe('Pedro Rocha');

    expect(StudentRepository.getAll).toBeCalledTimes(1);
  });
});

describe('getAll failure', () => {
  test('should fail to return all students', async () => {
    StudentRepository.getAll = jest.fn(() => {
      throw new Error('failed to retrieve the students');
    });

    try {
      await StudentService.getAll();
    } catch (err: any) {
      expect(err.message).toEqual('failed to retrieve the students');
    }
  });
});

describe('getByID success', () => {
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

    StudentRepository.getByID = jest.fn(() => Promise.resolve(mockStudent));

    const res = await StudentService.getByID(1);

    expect(res.name).toBe('Pedro Rocha');

    expect(StudentRepository.getByID).toBeCalledTimes(1);
  });
});

describe('getByID failure', () => {
  test('should fail to return a student by id', async () => {
    StudentRepository.getByID = jest.fn(() => {
      throw new Error('failed to retrieve the student');
    });

    try {
      await StudentService.getByID(1);
    } catch (err: any) {
      expect(err.message).toEqual('failed to retrieve the student');
    }
  });
});

describe('create success', () => {
  test('should create a new student', async () => {
    const mockStudent: IStudent = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      academic_record: '12345',
      social_security_number: '11122233344',
    };

    StudentRepository.checkAcademicRecord = jest.fn(() => Promise.resolve(false));
    StudentRepository.checkSocialSecurityNumber = jest.fn(() => Promise.resolve(false));
    StudentRepository.create = jest.fn(() => Promise.resolve());

    await StudentService.create(mockStudent);

    expect(StudentRepository.create).toBeCalledTimes(1);
  });
});

describe('create failure', () => {
  test('should fail to create a new student', async () => {
    const mockStudent: IStudent = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      academic_record: '12345',
      social_security_number: '11122233344',
    };

    StudentRepository.create = jest.fn(() => {
      throw new Error('failed to create the student');
    });

    try {
      await StudentService.create(mockStudent);
    } catch (err: any) {
      expect(err.message).toEqual('failed to create the student');
    }
  });
});

describe('update success', () => {
  test('should update a student', async () => {
    const mockStudent: IStudent = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
    };

    StudentRepository.getByID = jest.fn(() => Promise.resolve(mockStudent));
    StudentRepository.update = jest.fn(() => Promise.resolve());

    await StudentService.update(mockStudent);

    expect(StudentRepository.update).toBeCalledTimes(1);
  });
});

describe('update failure', () => {
  test('should fail to update a student', async () => {
    const mockStudent: IStudent = {
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
    };

    StudentRepository.update = jest.fn(() => {
      throw new Error('failed to update the student');
    });

    try {
      await StudentService.update(mockStudent);
    } catch (err: any) {
      expect(err.message).toEqual('failed to update the student');
    }
  });
});

describe('delete success', () => {
  test('should delete a student', async () => {
    const mockStudent: IStudent = {
      id: 1,
      name: 'Pedro Rocha',
      email: 'pedro_rocha@gmail.com',
      academic_record: '12345',
      social_security_number: '11122233344',
      created_at: new Date(),
      updated_at: new Date(),
    };

    StudentRepository.getByID = jest.fn(() => Promise.resolve(mockStudent));
    StudentRepository.remove = jest.fn(() => Promise.resolve());

    await StudentService.remove(1);

    expect(StudentRepository.remove).toBeCalledTimes(1);
  });
});

describe('remove failure', () => {
  test('should fail to remove a student', async () => {
    StudentRepository.remove = jest.fn(() => {
      throw new Error('failed to remove the student');
    });

    try {
      await StudentService.remove(1);
    } catch (err: any) {
      expect(err.message).toEqual('failed to remove the student');
    }
  });
});
