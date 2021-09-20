export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorTexts {
  SERVER_ERR_MSG = 'Server Error. Try again later.',
  VALIDATION_ERR_MSG = 'Data in wrong format was provided.',
  BAD_REQ_ERR_MSG = 'Bad request. Try again later.',
}
