import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from '@/features/auth'
import { configReducer, configSlice } from '@/features/user'
import { persistStore, persistReducer } from 'redux-persist'
import { apiSlice } from '@/lib/api'
import storage from '@/lib/storage'
import { chatReducer, chatSlice } from '@/features/chat'

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'

const authPersistConfig = {
  key: 'auth',
  storage
}

const chatPersistConfig = {
  key: 'chat',
  storage
}

const configPersistConfig = {
  key: 'config',
  storage
}

const persistAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistChatReducer = persistReducer(chatPersistConfig, chatReducer)
const persistConfigReducer = persistReducer(configPersistConfig, configReducer)

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
