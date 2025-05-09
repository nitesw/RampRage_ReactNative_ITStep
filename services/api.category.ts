import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "@/utils/createBaseQuery";
import {ICategory} from "@/interfaces/category";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: createBaseQuery('categories'),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], string | null>({
            query: (token) => {
                console.log("token", token)
                return {
                    url: 'getAll',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        }),
        deleteCategory: builder.mutation<void, [number, string | null]>({
            query: ([id, token]) => {
                console.log("Rtk query token:", token);
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['Category'],
        }),
        createCategory: builder.mutation<ICategory, [FormData, string | null]>({
            query: ([category, token]) => {
                return {
                    url: 'create',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: category
                }
            },
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation<void, [FormData, string | null]>({
            query: ([category, token]) => {
                return {
                    url: 'edit',
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: category
                }
            },
            invalidatesTags: ['Category']
        })
    })
})

export const { useGetCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation } = categoryApi;