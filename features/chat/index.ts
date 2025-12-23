import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'
import { type IChat } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

// Chat Slice

const initialState: {
  id: string
  messages: IChat['messages']
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
    fetchChats: builder.mutation<IChat[], unknown>({
      query: () => '/chat',
      transformResponse: (response: unknown) => extractData<IChat[]>(response)
    }),

    getChat: builder.mutation<IChat, string>({
      query: id => `/chat/${id}`,
      transformResponse: (response: unknown) => extractData<IChat>(response)
    }),

    createChat: builder.mutation<IChat, Partial<IChat>>({
      query: chat => ({
        url: '/chat',
        method: 'POST',
        body: chat
      }),
      transformResponse: (response: unknown) => extractData<IChat>(response)
    }),

    updateChat: builder.mutation<IChat, Partial<IChat>>({
      query: ({ _id, ...data }) => ({
        url: '/chat/' + _id,
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: unknown) => extractData<IChat>(response)
    }),

    deleteChat: builder.mutation<IChat, string>({
      query: id => ({
        url: `/chat/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: unknown) => extractData<IChat>(response)
    }),

    findUserChats: builder.mutation<IChat[], string>({
      query: userId => ({
        url: `/chat/finduserchats/${userId}`,
        method: 'GET'
      }),
      transformResponse: (response: unknown) => extractData<IChat[]>(response)
    }),

    addMessageToChat: builder.mutation<
      IChat,
      { chatId: string; message: Partial<IChat['messages'][0]> }
    >({
      query: ({ chatId, message }) => ({
        url: `/chat/addmessage/${chatId}`,
        method: 'POST',
        body: { message }
      }),
      transformResponse: (response: unknown) => extractData<IChat>(response)
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
  useFindUserChatsMutation,
  useAddMessageToChatMutation
} = chatApiSlice
