import { apiSlice } from '$api'
import { type Post } from '$types'
import { type MulterFile } from '../../types/models'

const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchPosts: builder.mutation<Post[], any>({
            query: () => '/post'
        }),

        getPost: builder.mutation<Post, string>({
            query: id => `/post/${id}`
        }),

        createPost: builder.mutation<Post, {
            postedBy: string,
            postedIn: 'feed' | 'chat' | 'class',
            content: {
                text?: string,
                picture?: MulterFile
            }
        }>({
            query: data => ({
                url: '/post',
                method: 'POST',
                body: data
            })
        }),

        updatePost: builder.mutation<Post, Partial<Post>>({
            query: ({ _id, ...data }) => ({
                url: `/post/${_id}`,
                method: 'PATCH',
                body: data
            })
        }),

        deletePost: builder.mutation<Post, string>({
            query: id => ({
                url: `/post/${id}`,
                method: 'DELETE'
            })
        })
    })
})

// Exports

export const { 
    useGetPostMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useFetchPostsMutation,
    useUpdatePostMutation
} = postApiSlice
