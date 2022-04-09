import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'

import { rootReducers } from './rootReducers'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store)