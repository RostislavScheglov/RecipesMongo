import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getAllRecipes = createAsyncThunk('Recipes/All', async (data)=>{
    return data;
})
export const getFavRecipes = createAsyncThunk('Recipes/Favourite', async (data)=>{
    return data;
})
export const getMyRecipes = createAsyncThunk('Recipes/My Recipes', async (data)=>{
    return data;
})
export const getNewRecipe = createAsyncThunk('Recipes/New Recipe', async (data)=>{
    return data;
})
export const setRecipe = createAsyncThunk('GetOne', async (data)=>{
    return data;
})

const recipeSlice = createSlice({
    name: 'recipes',
    initialState:{
        items: [],
        status: 'loading'
    },
    extraReducers:{
        [getAllRecipes.pending]: (state) =>{
            state.items = []
            state.status = 'loading'
        },
        [getAllRecipes.fulfilled]: (state, action) =>{
            state.items = action.payload
            state.status = 'loaded'
        },
        [getAllRecipes.rejected]: (state) =>{
            state.items = []
            state.status = 'error'
        },
        [getFavRecipes.pending]: (state) =>{
            state.items = []
            state.status = 'loading'
        },
        [getFavRecipes.fulfilled]: (state, action) =>{
            state.items = action.payload
            state.status = 'loaded'
        },
        [getFavRecipes.rejected]: (state) =>{
            state.items = []
            state.status = 'error'
        },
        [getMyRecipes.pending]: (state) =>{
            state.items = []
            state.status = 'loading'
        },
        [getMyRecipes.fulfilled]: (state, action) =>{
            state.items = action.payload
            state.status = 'loaded'
        },
        [getMyRecipes.rejected]: (state) =>{
            state.items = []
            state.status = 'error'
        },
        [getNewRecipe.pending]: (state) =>{
            state.items = []
            state.status = 'loading'
        },
        [getNewRecipe.fulfilled]: (state, action) =>{
            state.items = action.payload
            state.status = 'loaded'
        },
        [getNewRecipe.rejected]: (state) =>{
            state.items = []
            state.status = 'error'
        },
        [setRecipe.pending]: (state) =>{
            state.items = []
            state.status = 'loading'
        },
        [setRecipe.fulfilled]: (state, action) =>{
            state.items = action.payload
            state.status = 'loaded'
        },
        [setRecipe.rejected]: (state) =>{
            state.items = []
            state.status = 'error'
        }
    }
})
export const getRecipeInfo = (state) => state.recipes.items
export const recipeReducer = recipeSlice.reducer;
