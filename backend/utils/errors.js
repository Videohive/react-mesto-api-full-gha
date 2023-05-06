const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;
const HTTP_STATUS_CONFLICT = 409;
const UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;

function handleErrors(error, response) {
  if (error.code === 11000) {
    return response.status(HTTP_STATUS_CONFLICT).send({ message: 'Пользователь с данным email уже существует' });
  }

  if (error.name === 'CastError' || error.name === 'ValidationError') {
    return response.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }

  return response.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
}

function handleErrorNotFound(response, string) {
  return response.status(NOT_FOUND).send({ message: string });
}

function handleAuthErr(response, string) {
  return response.status(UNAUTHORIZED).send({ message: string });
}

function handleForbiddenError(response, string) {
  return response.status(HTTP_STATUS_FORBIDDEN).send({ message: string });
}

module.exports = {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  handleErrors,
  handleErrorNotFound,
  handleAuthErr,
  handleForbiddenError,
};
