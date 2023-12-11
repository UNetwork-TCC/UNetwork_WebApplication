import { apiSlice } from '$api'
import { type Message } from '$types'

// Message API Slice

const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchMessages: builder.mutation<Message[], unknown>({
            query: () => '/message'
        }),

        getMessage: builder.mutation<Message, string>({
            query: id => `/message/${id}`
        }),

        createMessage: builder.mutation<Message, Partial<Message>>({
            query: message => ({
                url: '/message',
                method: 'POST',
                body: message
            })
        }),

        updateMessage: builder.mutation<Message, Partial<Message>>({
            query: ({ _id, ...data }) => ({
                url: '/message',
                method: 'PATCH',
                body: data
            })
        }),

        deleteMessage: builder.mutation<Message, string>({
            query: id => ({
                url: `/message/${id}`,
                method: 'DELETE'
            })
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