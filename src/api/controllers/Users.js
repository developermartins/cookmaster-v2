const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const service = require('../services/Users');

const STATUS = {
  CREATED: 201,
  OK: 200,
};

const secret = 'DevMartsSecret';

const registerUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await service.registerUser(name, email, password);

  if (newUser.message) return next(newUser);

  return res.status(STATUS.CREATED).json(newUser);
});

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const login = await service.loginUser(email, password);

  if (login.message) return next(login);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: login }, secret, jwtConfig);

  return res.status(STATUS.OK).json({ token });
});

module.exports = {
  registerUser,
  loginUser,
};
