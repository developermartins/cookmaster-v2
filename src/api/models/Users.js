// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
  .then((result) => result.ops[0]);

const findByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const findUserInfo = (email, password) => connection()
  .then((db) => db.collection('users').findOne(
    { email, password },
  ));

module.exports = {
  createUser,
  findByEmail,
  findUserInfo,
};
