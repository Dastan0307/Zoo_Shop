import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { announcementApi } from './announcements/getAnnoun'
// import { announcementApi } from './announcements/getAnnoun'
import authSlice from './features/auth/authSlice'
import { categoryApi } from './features/category/categorySevice'
import cardsSlice from './features/details/detailsSlice'

const rootReducer = combineReducers({
  auth: authSlice,
  card: cardsSlice,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [announcementApi.reducerPath]: announcementApi.reducer,
})

const persistConfig = { key: 'root', storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([categoryApi.middleware, announcementApi.middleware]),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch