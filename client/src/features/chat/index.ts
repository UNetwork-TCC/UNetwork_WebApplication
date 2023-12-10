import { apiSlice } from '$api'
import { type Chat } from '$types'

const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchChats: builder.mutation<Chat[], unknown>({
            query: () => '/chat'
        }),

        getChat: builder.mutation<Chat, string>({
            query: id => `/chat/${id}`
        }),

        createChat: builder.mutation<Chat, Partial<Chat>>({
            query: chat => ({
                url: '/chat',
                method: 'POST',
                body: chat
            })
        }),

        updateChat: builder.mutation<Chat, Partial<Chat>>({
            query: ({ _id, ...data }) => ({
                url: '/chat',
                method: 'PATCH',
                body: data
            })
        }),

        deleteChat: builder.mutation<Chat, string>({
            query: id => ({
                url: `/chat/${id}`,
                method: 'DELETE'
            })
        }),

        findUserChats: builder.mutation<Chat[], string>({
            query: userId => ({
                url: `/chat/finduserchats/${userId}`,
                method: 'GET'
            })
        })
    })
})

// Exports

export const {
    useFetchChatsMutation,
    useGetChatMutation,
    useCreateChatMutation,
    useUpdateChatMutation,
    useDeleteChatMutation,
    useFindUserChatsMutation
} = chatApiSlice