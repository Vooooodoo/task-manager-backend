const { verifyToken } = require('../utils/token');
const AuthError = require('../errors/AuthError');

const authErr = new AuthError('Authorization is required.');

module.exports = (req, res, next) => {
  //! всё обернуть в try/catch
  const { authorization } = req.headers;

  //! можно будет избавиться, потому что всё будет в try/catch
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw authErr;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  //! тоже можно будет избавиться и общий catch будет с AuthError
  try {
    payload = verifyToken(token);
  } catch (err) {
    throw authErr;
  }

  req.user = payload;

  next();
};
