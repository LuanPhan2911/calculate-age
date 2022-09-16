import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import AppReducer from '../features/app/AppSlice';
import UserReducer from '../features/user/UserSlice';


const reducers = combineReducers({
    app: AppReducer,
    user: UserReducer,
});
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['app', 'user']
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});
export default store;