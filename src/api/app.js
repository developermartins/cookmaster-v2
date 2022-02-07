const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const validateJWT = require('./auth/validateJWT');
const Users = require('./controllers/Users');
const Recipes = require('./controllers/Recipes');
const middleware = require('./middleware/error');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', Users.registerUser);

app.post('/login', Users.loginUser);

app.post('/recipes', validateJWT, Recipes.registerRecipe);

app.get('/recipes', Recipes.listRecipes);

app.get('/recipes/:id', Recipes.getRecipeById);

app.put('/recipes/:id', validateJWT, Recipes.editRecipe);

app.put('/recipes/:id/image/', validateJWT, upload.single('image'), Recipes.putImage);

app.delete('/recipes/:id', validateJWT, Recipes.deleteRecipe);

app.get('/images/:id', Recipes.getRecipeImage);

app.use(middleware);

module.exports = app;
