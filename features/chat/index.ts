import { apiSlice } from '@/lib/api'
import { type Chat } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

// Chat Slice

const initialState: {
    id: string,
    messages: Chat['messages']
} = {
    id: '',
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatId: (state, action) => {
            state.id = action.payload
        },

        setMessages: (state, action) => {
            state.messages = action.payload
        }
    }
})

// Chat API Slice

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
                url: '/chat/' + _id,
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

export const chatReducer = chatSlice.reducer
export const { setChatId, setMessages } = chatSlice.actions

export const {
    useFetchChatsMutation,
    useGetChatMutation,
    useCreateChatMutation,
    useUpdateChatMutation,
    useDeleteChatMutation,
    useFindUserChatsMutation
} = chatApiSlice