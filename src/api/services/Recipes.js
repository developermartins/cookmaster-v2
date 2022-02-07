const { ObjectId } = require('mongodb');
const Recipe = require('../models/Recipes');

const invalidEntries = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const notFound = {
  status: 404,
  message: 'recipe not found',
};

const validateRecipeInfo = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return invalidEntries;
};

const validateId = (id) => {
  if (!ObjectId.isValid(id)) return notFound;
};

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const data = validateRecipeInfo(name, ingredients, preparation);

  if (data) return data;

  const create = await Recipe.registerRecipe(name, ingredients, preparation, userId);

  const { _id } = create;

  const result = {
    recipe: {
      _id,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
  // console.log(result);
  return result;
};

const listRecipes = async () => {
  const recipeList = await Recipe.listRecipes();

  return recipeList;
};

const getRecipeById = async (id) => {
  const validId = validateId(id);

  if (validId) return validId;

  const recipe = await Recipe.getRecibeById(id);

  if (!recipe) return notFound;

  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const validRecipeInfo = validateRecipeInfo(name, ingredients, preparation);

  if (validRecipeInfo) return validRecipeInfo;

  const recipeToEdit = await Recipe.editRecipe(id, name, ingredients, preparation);

  return recipeToEdit;
};

const deleteRecipe = async (id) => {
  const validId = validateId(id);

  if (validId) return validId;

  await Recipe.deleteRecipe(id);
};

const putImage = async (id, image) => {
  const validId = validateId(id);

  if (validId) return validId;

  const img = `localhost:3000/src/uploads/${image}`;

  const recipe = await Recipe.putImage(id, img);

  return recipe;
};

module.exports = {
  registerRecipe,
  listRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  putImage,
};
