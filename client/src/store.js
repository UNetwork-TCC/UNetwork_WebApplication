import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from './features/auth/auth-slicer'
import { newsReducer, newsSlice } from './features/news/news-slicer'

const store = configureStore({
    reducer: {
        [authSlice.name]: authReducer,
        [newsSlice.name]: newsReducer
    }
})

export default store