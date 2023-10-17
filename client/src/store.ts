import { configureStore } from '@reduxjs/toolkit'

import { authReducer, authSlice } from '$features/auth'
import { newsReducer, newsSlice } from '$features/news'
import { forumReducer, forumSlice } from '$features/forum'
import { userReducer, userSlice } from '$features/user'
import { postReducer, postSlice } from '$features/post'

import {
    type TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux'

const store = configureStore({
    reducer: {
        [authSlice.name]: authReducer,
        [newsSlice.name]: newsReducer,
        [forumSlice.name]: forumReducer,
        [userSlice.name]: userReducer,
        [postSlice.name]: postReducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector

export default store
