export interface IStudent {
  id?: number;
  name: string;
  email: string;
  academic_record: string;
  social_security_number: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IStudentRepository {
  getAll: () => Promise<IStudent[]>;
  getByID: (id: number) => Promise<IStudent>;
  create: (student: IStudent) => Promise<void>;
  update: (student: IStudent) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export interface IStudentService {
  getAll: () => Promise<IStudent[]>;
  getByID: (id: number) => Promise<IStudent>;
  create: (student: IStudent) => Promise<void>;
  update: (student: IStudent) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
