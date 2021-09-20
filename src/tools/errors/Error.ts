export class CustomError extends Error {
  status: number;
  message: string;

  constructor(status: number | undefined, message: string | undefined) {
    super();
    this.name = 'CustomError';
    this.status = status ? status : 500;
    this.message = message ? message : 'Error occured';
  }
}
