import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'
import { type IMessage } from '@/types'

// Message API Slice

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchMessages: builder.mutation<IMessage[], unknown>({
      query: () => '/message',
      transformResponse: (response: unknown) => extractData<IMessage[]>(response)
    }),

    getMessage: builder.mutation<IMessage, string>({
      query: id => `/message/${id}`,
      transformResponse: (response: unknown) => extractData<IMessage>(response)
    }),

    createMessage: builder.mutation<IMessage, Partial<IMessage>>({
      query: message => ({
        url: '/message',
        method: 'POST',
        body: message
      }),
      transformResponse: (response: unknown) => extractData<IMessage>(response)
    }),

    updateMessage: builder.mutation<IMessage, Partial<IMessage>>({
      query: ({ _id, ...data }) => ({
        url: '/message',
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: unknown) => extractData<IMessage>(response)
    }),

    deleteMessage: builder.mutation<IMessage, string>({
      query: id => ({
        url: `/message/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: unknown) => extractData<IMessage>(response)
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
