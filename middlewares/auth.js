// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/unautorized-error');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходима авторизация');
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
