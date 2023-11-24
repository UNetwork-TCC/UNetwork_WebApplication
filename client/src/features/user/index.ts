import { apiSlice } from '$api'
import { type User } from '$types'

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchUsers: builder.mutation<User[], unknown>({
            query: () => '/user'
        }),

        getUser: builder.mutation<User, string>({
            query: id => `/user/${id}`
        }),

        updateUser: builder.mutation<User, Partial<User>>({
            query: ({ _id, ...data }) => ({
                url: `/user/${_id}`,
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