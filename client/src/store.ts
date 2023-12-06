import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from '$features/auth'
import { configReducer, configSlice } from '$features/user'
import { persistStore, persistReducer } from 'redux-persist'
import { apiSlice } from '$api'
import { REDUX_PERSIST_STORE_KEY } from '$constants'
import storage from 'redux-persist/lib/storage'

import {
    type TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux'

const persistConfig = {
    key: REDUX_PERSIST_STORE_KEY,
    storage
}

const persistAuthReducer = persistReducer(persistConfig, authReducer)
const persistConfigReducer = persistReducer(persistConfig, configReducer)

const store = configureStore({
    reducer: {
        [authSlice.name]: persistAuthReducer,
        [configSlice.name]: persistConfigReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector

export const persistedStore = persistStore(store)
export default store
