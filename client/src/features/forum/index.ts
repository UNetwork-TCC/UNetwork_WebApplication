import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '$api'
import { type Forum } from '$types'

const initialState: { forum: Partial<Forum> } = {
    forum: {}
}
export const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {}
})

// Forum Api Slice

const forumApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchForums: builder.mutation<Forum[], unknown>({
            query: () => '/forum'
        }),

        getForum: builder.mutation<Forum, string>({
            query: id => `/forum/${id}`
        }),

        createForum: builder.mutation<Forum, Partial<Forum>>({
            query: forum => ({
                url: '/forum',
                method: 'POST',
                body: forum
            })
        }),

        updateForum: builder.mutation<Forum, Partial<Forum>>({
            query: ({ _id, ...data }) => ({
                url: '/forum',
                method: 'PATCH',
                body: data
            })
        }),

        deleteForum: builder.mutation<Forum, string>({
            query: id => ({
                url: `/forum/${id}`,
                method: 'DELETE'
            })
        })
    })
})

// Exports

export const {
    useFetchForumsMutation,
    useGetForumMutation,
    useCreateForumMutation,
    useUpdateForumMutation,
    useDeleteForumMutation
} = forumApiSlice

export const forumReducer = forumSlice.reducer
