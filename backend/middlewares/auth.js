const jwt = require('jsonwebtoken');
const { handleAuthErr } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthErr(res, 'Необходима авторизация');
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-dev-secret-key');
  } catch (err) {
    handleAuthErr(res, 'Необходима авторизация');
    return;
  }
  req.user = payload;
  next();
};
