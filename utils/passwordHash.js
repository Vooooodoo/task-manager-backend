const bcrypt = require('bcryptjs');
const config = require('../config');

const generatePassHash = (pass) => bcrypt.hashSync(pass, Number(config.passwordHash.salt));

const comparePasswords = (reqPass, dbPass) => bcrypt.compare(reqPass, dbPass);

module.exports = { generatePassHash, comparePasswords };
