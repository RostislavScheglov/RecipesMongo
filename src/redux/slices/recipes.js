import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

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
export const isDeleted = (state) => Boolean(state.recipes.items)
export const recipeReducer = recipeSlice.reducer;
