import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
    reducerPath: 'auth-api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005/api/auth',
    }),
    endpoints: builder => ({
        // queries (GET)
        loggedIn: builder.query({
            query: () => ({
                url: '/loggedin',
            }),
        }),
        // mutations (POST, PATCH, PUT, DELETE)
        signup: builder.mutation({
            query: signupInfo => ({
                url: '/signup',
                method: 'POST',
                body: signupInfo,
            }),
        }),
        login: builder.mutation({
            query: loginInfo => ({
                url: '/login',
                method: 'POST',
                body: loginInfo,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
            }),
            method: 'DELETE',
        }),
    }),
});

export const {
    useLazyLoggedInQuery,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
} = authApiSlice;
