import express from 'express';
import { config } from './config/config.js';
import mongoose from 'mongoose';
import { registrValidation, loginValidation, recipeValidation } from './validators/authValidator.js';
import {registration, login, getMe} from './routes/userActions.js';
import {create, getAll, getOne, remove, update, getFavourite, getMyRecipes, getBySearch} from './routes/recipesActions.js'
import checkSession from './middleware/checkSession.js';
import cors from 'cors';

const app = express();
const port = config.serverPort;
const dbUrl = config.dbURL;

app.use(express.json());
app.use(cors());
app.post('/auth/registration', registrValidation, registration);
app.post('/auth/login', loginValidation, login);
app.post('/auth/me', checkSession, getMe);

app.get('/recipes', getAll);
app.get('/search',  getBySearch);
app.post('/recipes', checkSession, recipeValidation, create);
app.get('/recipes/favourites', checkSession, getFavourite);
app.get('/recipes/myrecipes', checkSession, getMyRecipes);
app.get('/recipes/:id', getOne);
app.delete('/recipes/:id', checkSession, remove);
app.patch('/recipes/:id', checkSession, update);



const start = async () => {
    mongoose.connect(dbUrl)
        .then(() => { console.log("Db connected") })
        .catch((err) => { console.log("Db error: " + err) })
    app.listen(port, (err)=> {
        if(err){
            return console.log(err);
        }
        console.log('Server running on port ' + port);
    });
}

start();