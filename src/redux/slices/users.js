import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getLoginInfo = createAsyncThunk('User/Login', async (data)=>{
    return data
})
export const getRegistrInfo = createAsyncThunk('User/Registr', async (data)=>{
    return data
})
export const getMeInfo = createAsyncThunk('User/Me', async (data)=>{
    return data
})

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        data: null,
        status: 'loading',
    },
    reducers:{
        logout:(state) => {
            state.data=null
        }
    },
    extraReducers:{
        [getLoginInfo.pending]: (state) =>{
            state.data = []
            state.status = 'loading'
        },
        [getLoginInfo.fulfilled]: (state, action) =>{
            state.data = action.payload
            state.status = 'loaded'
        },
        [getLoginInfo.rejected]: (state, action) =>{
            state.errors = action.payload
            state.status = 'error'
        },
        [getRegistrInfo.pending]: (state) =>{
            state.data = []
            state.status = 'loading'
        },
        [getRegistrInfo.fulfilled]: (state, action) =>{
            state.data = action.payload
            state.status = 'loaded'
        },
        [getRegistrInfo.rejected]: (state, action) =>{
            state.errors = action.payload
            state.status = 'error'
        },
        [getMeInfo.pending]: (state) =>{
            state.data = []
            state.status = 'loading'
        },
        [getMeInfo.fulfilled]: (state, action) =>{
            state.data = action.payload
            state.status = 'loaded'
        },
        [getMeInfo.rejected]: (state, action) =>{
            state.errors = action.payload
            state.status = 'error'
        },
    }
})

export const isAuthUser = (state) => Boolean(state.auth.data)

export const userId = (state) => state.auth.data?._id
export const userData = (state) => state.auth.data

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions