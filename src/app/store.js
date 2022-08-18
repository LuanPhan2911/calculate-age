import { configureStore } from '@reduxjs/toolkit';
import AppReducer from '../features/app/AppSlice';

export default configureStore({
    reducer: {
        app: AppReducer,
    },
})