/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface ICreateStudent {
  academic_record: string;
  email: string;
  name: string;
  social_security_number: string;
}

export interface IUpdateStudent {
  email: string;
  id: number;
  name: string;
  updated_at?: Date;
}
