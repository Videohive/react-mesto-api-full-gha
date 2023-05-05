const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { handleAuthErr } = require('../utils/errors');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'some-dev-secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthErr(res, 'Необходима авторизация');
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthErr(res, 'Необходима авторизация');
    return;
  }
  req.user = payload;
  next();
};
