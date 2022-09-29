import { configureStore } from '@reduxjs/toolkit';
import { recipeReducer } from './slices/recipes'
import { authReducer } from './slices/users';


const store = configureStore({
    reducer:{
        recipes: recipeReducer,
        auth: authReducer
    }
})

export default store;