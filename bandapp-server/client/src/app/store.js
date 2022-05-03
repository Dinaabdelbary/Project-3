import { configureStore } from '@reduxjs/toolkit';
import user from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        user
    }
});