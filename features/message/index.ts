import { apiSlice } from '@/lib/api'
import { type IMessage } from '@/types'

interface ApiResponse<T> {
  message: string
  data: T
  status: number
}

// Message API Slice

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchMessages: builder.mutation<IMessage[], unknown>({
      query: () => '/message',
      transformResponse: (response: ApiResponse<IMessage[]>) => response.data
    }),

    getMessage: builder.mutation<IMessage, string>({
      query: id => `/message/${id}`,
      transformResponse: (response: ApiResponse<IMessage>) => response.data
    }),

    createMessage: builder.mutation<IMessage, Partial<IMessage>>({
      query: message => ({
        url: '/message',
        method: 'POST',
        body: message
      }),
      transformResponse: (response: ApiResponse<IMessage>) => response.data
    }),

    updateMessage: builder.mutation<IMessage, Partial<IMessage>>({
      query: ({ _id, ...data }) => ({
        url: '/message',
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: ApiResponse<IMessage>) => response.data
    }),

    deleteMessage: builder.mutation<IMessage, string>({
      query: id => ({
        url: `/message/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: ApiResponse<IMessage>) => response.data
    })
  })
})

// Exports

export const {
  useFetchMessagesMutation,
  useGetMessageMutation,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation
} = messageApiSlice
