import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "@/utils/createBaseQuery";
import {ILogin, ILoginResponse} from "@/interfaces/account";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: createBaseQuery('Auth'),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILogin>({
            query: (data) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data
                }
            }
        })
    })
})

export const { useLoginMutation } = authApi;