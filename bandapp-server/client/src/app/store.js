import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authApiSlice } from '../features/auth/authApi';
import user from '../features/auth/authSlice';

const middleware = [authApiSlice.middleware];

export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        user,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(middleware);
    },
});
