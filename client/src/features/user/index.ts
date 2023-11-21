import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '$api'
import { type User } from '$types'

const initialState: { user: User | Record<string, unknown> } = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

// User API Slice

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchUsers: builder.mutation<User, unknown>({
            query: () => '/user'
        }),

        getUser: builder.mutation<User, string>({
            query: id => `/user/${id}`
        }),

        updateUser: builder.mutation<User, Partial<User>>({
            query: data => ({
                url: '/user',
                method: 'PATCH',
                body: data
            })
        }),

        deleteUser: builder.mutation<User, string>({
            query: id => ({
                url: `/user/${id}`,
                method: 'DELETE'
            })
        })
    })
})

// Exports

export const {
    useDeleteUserMutation,
    useFetchUsersMutation,
    useGetUserMutation,
    useUpdateUserMutation
} = userApiSlice

export const userReducer = userSlice.reducer
