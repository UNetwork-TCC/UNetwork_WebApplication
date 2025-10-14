import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from '@/features/auth'
import { configReducer, configSlice } from '@/features/user'
import { persistStore, persistReducer } from 'redux-persist'
import { apiSlice } from '@/lib/api'
import storage from 'redux-persist/lib/storage'
import { chatReducer, chatSlice } from '@/features/chat'

import {
    type TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux'

const persistConfig = {
    key: process.env.NEXT_PUBLIC_REDUX_PERSIST_STORE_KEY,
    storage
}

const persistAuthReducer = persistReducer(persistConfig, authReducer)
const persistChatReducer = persistReducer(persistConfig, chatReducer)
const persistConfigReducer = persistReducer(persistConfig, configReducer)

const store = configureStore({
    reducer: {
        [authSlice.name]: persistAuthReducer,
        [configSlice.name]: persistConfigReducer,
        [chatSlice.name]: persistChatReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    // Ignorar todas as ações do redux-persist
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                    'persist/PAUSE',
                    'persist/PURGE'
                ]
            }
        }).concat(apiSlice.middleware),
    devTools: true
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector

export const persistedStore = persistStore(store)
export default store
