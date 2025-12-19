import { apiSlice } from '@/lib/api'
import { type IForum } from '@/types'

interface ApiResponse<T> {
  message: string
  data: T
  status: number
}

const forumApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchForums: builder.mutation<IForum[], unknown>({
      query: () => '/forum',
      transformResponse: (response: ApiResponse<IForum[]>) => response.data
    }),

    getForum: builder.mutation<IForum, string>({
      query: id => `/forum/${id}`,
      transformResponse: (response: ApiResponse<IForum>) => response.data
    }),

    createForum: builder.mutation<IForum, Partial<IForum>>({
      query: forum => ({
        url: '/forum',
        method: 'POST',
        body: forum
      }),
      transformResponse: (response: ApiResponse<IForum>) => response.data
    }),

    updateForum: builder.mutation<IForum, Partial<IForum>>({
      query: ({ _id, ...data }) => ({
        url: '/forum',
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: ApiResponse<IForum>) => response.data
    }),

    deleteForum: builder.mutation<IForum, string>({
      query: id => ({
        url: `/forum/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: ApiResponse<IForum>) => response.data
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
