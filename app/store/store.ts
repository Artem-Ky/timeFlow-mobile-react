import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	PersistConfig,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist'

import { rootReducer } from '@/store/root-reducer'

const persistConfig: PersistConfig<any> = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['auth']
}

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
