import { EHTTP } from '../../enums/http-status-code';

export default class AcademicRecordError extends Error {
  message: string;
  status: number;

  constructor(message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.status = EHTTP.StatusConflict;
  }
}
