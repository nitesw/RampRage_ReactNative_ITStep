import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "@/utils/createBaseQuery";
import {ILogin, IAuthResponse} from "@/interfaces/user";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: createBaseQuery('auth'),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, ILogin>({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        register: builder.mutation<IAuthResponse, FormData>({
            query: (formData) => ({
                url: 'register',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Auth']
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApi;