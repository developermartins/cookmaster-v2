// const { ObjectId } = require('mongodb');
const Users = require('../models/Users');

const invalidEntries = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const uniqueEmail = {
  status: 409,
  message: 'Email already registered',
};

const unauthorized = {
  status: 401,
  message: 'All fields must be filled',
};

const unauthorizedEmailOrPassword = {
  status: 401,
  message: 'Incorrect username or password',
};

// regex referência: https://ui.dev/validate-email-address-javascript/
const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUserInfo = async (name, email, password) => {
  if (validFormat.test(email) === false || !name || !password) return invalidEntries;

  if (await Users.findByEmail(email)) return uniqueEmail;
};

const validateLogin = async (email, password) => {
  if (validFormat.test(email) === false || !password) return unauthorized;

  const UserData = await Users.findUserInfo(email, password);
  // console.log(UserData)
  if (!UserData) return unauthorizedEmailOrPassword;
};

const registerUser = async (name, email, password) => {
  const data = await validateUserInfo(name, email, password);

  if (data) return data;

  const create = await Users.createUser(name, email, password);

  const { role, _id } = create;

  const result = {
    user: {
      name,
      email,
      role,
      _id,
    },
  };

  return result;
};

const loginUser = async (email, password) => {
  const UserData = await validateLogin(email, password);

  if (UserData) return UserData;

  return Users.findUserInfo(email, password);
};

module.exports = {
  registerUser,
  loginUser,
};
