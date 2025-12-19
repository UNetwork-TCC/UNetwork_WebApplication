import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'
import { type IForum } from '@/types'

const forumApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchForums: builder.mutation<IForum[], unknown>({
      query: () => '/forum',
      transformResponse: (response: unknown) => extractData<IForum[]>(response)
    }),

    getForum: builder.mutation<IForum, string>({
      query: id => `/forum/${id}`,
      transformResponse: (response: unknown) => extractData<IForum>(response)
    }),

    createForum: builder.mutation<IForum, Partial<IForum>>({
      query: forum => ({
        url: '/forum',
        method: 'POST',
        body: forum
      }),
      transformResponse: (response: unknown) => extractData<IForum>(response)
    }),

    updateForum: builder.mutation<IForum, Partial<IForum>>({
      query: ({ _id, ...data }) => ({
        url: '/forum',
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: unknown) => extractData<IForum>(response)
    }),

    deleteForum: builder.mutation<IForum, string>({
      query: id => ({
        url: `/forum/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: unknown) => extractData<IForum>(response)
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
