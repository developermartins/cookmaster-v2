const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
    ))
  .then((result) => result.ops[0]);

const listRecipes = () => connection()
  .then((db) => db.collection('recipes')
  .find()
  .toArray());

const getRecibeById = (_id) => connection().then((db) => db.collection('recipes')
  .findOne(new ObjectId(_id)));

const editRecipe = (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    ))
    .then((result) => result.value);

const deleteRecipe = (id) => connection()
  .then((db) => db.collection('recipes').remove({ _id: ObjectId(id) }));

const putImage = (id, image) => connection()
.then((db) => db.collection('recipes')
  .findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image } },
    { returnOriginal: false },
  ))
  .then((result) => result.value);

module.exports = {
  registerRecipe,
  listRecipes,
  getRecibeById,
  editRecipe,
  deleteRecipe,
  putImage,
};
