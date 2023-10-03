import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from '$features/auth/auth-slicer'
import { newsReducer, newsSlice } from '$features/news/news-slicer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        [authSlice.name]: authReducer,
        [newsSlice.name]: newsReducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export default store