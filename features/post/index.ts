import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'
import { type IPost } from '@/types'
import { type MulterFile } from '../../types/models'

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchPosts: builder.mutation<IPost[], unknown>({
      query: () => '/post',
      transformResponse: (response: unknown) => extractData<IPost[]>(response)
    }),

    getPost: builder.mutation<IPost, string>({
      query: id => `/post/${id}`,
      transformResponse: (response: unknown) => extractData<IPost>(response)
    }),

    createPost: builder.mutation<
      IPost,
      {
        postedBy: string
        postedIn: 'feed' | 'chat' | 'class'
        content: {
          text?: string
          picture?: MulterFile
        }
      }
    >({
      query: data => ({
        url: '/post',
        method: 'POST',
        body: data
      })
    }),

    updatePost: builder.mutation<IPost, Partial<IPost>>({
      query: ({ _id, ...data }) => ({
        url: `/post/${_id}`,
        method: 'PATCH',
        body: data
      })
    }),

    deletePost: builder.mutation<IPost, string>({
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
