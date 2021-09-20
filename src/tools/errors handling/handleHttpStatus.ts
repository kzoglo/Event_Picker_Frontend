import { CustomError } from '../../tools/errors/Error';
import { ErrorTexts, StatusCodes } from './enums';

export const handleHttpStatus = (status: number) => {
  const handler = (message: string, status: number) => {
    const error = new CustomError(status, message);
    throw error;
  };

  const {
    OK,
    CREATED,
    BAD_REQUEST,
    UNPROCESSABLE_ENTITY,
    INTERNAL_SERVER_ERROR,
  } = StatusCodes;
  const {
    BAD_REQ_ERR_MSG,
    VALIDATION_ERR_MSG,
    SERVER_ERR_MSG
  } = ErrorTexts;

  switch (status) {
    case OK:
    case CREATED:
      break;
    case BAD_REQUEST:
      handler(BAD_REQ_ERR_MSG, BAD_REQUEST);
      break;
    case UNPROCESSABLE_ENTITY:
      handler(VALIDATION_ERR_MSG, UNPROCESSABLE_ENTITY);
      break;
    case INTERNAL_SERVER_ERROR:
      handler(SERVER_ERR_MSG, INTERNAL_SERVER_ERROR);
      break;
    default:
      handler(SERVER_ERR_MSG, INTERNAL_SERVER_ERROR);
  }

  return;
};
