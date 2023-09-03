import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from './features/auth/auth-slicer'

const store = configureStore({
    reducer: {
        [authSlice.name]: authReducer
    }
})

export default store