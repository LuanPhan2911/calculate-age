import { configureStore } from '@reduxjs/toolkit';
import LanguageReducer from '../features/app/ChangeLanguageSlice';

export default configureStore({
    reducer: {
        language: LanguageReducer,
    },
})