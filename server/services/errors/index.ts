import ResponseStatus from 'enums/response-status';

export class BadRequest extends Error {
  status: ResponseStatus.BAD_REQUEST;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class NotFound extends Error {
  status: ResponseStatus.NOT_FOUND;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
