import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/users'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
