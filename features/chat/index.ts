import { apiSlice } from '@/lib/api'
import { type IChat } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

interface ApiResponse<T> {
  message: string
  data: T
  status: number
}

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
      transformResponse: (response: ApiResponse<IChat[]>) => response.data
    }),

    getChat: builder.mutation<IChat, string>({
      query: id => `/chat/${id}`,
      transformResponse: (response: ApiResponse<IChat>) => response.data
    }),

    createChat: builder.mutation<IChat, Partial<IChat>>({
      query: chat => ({
        url: '/chat',
        method: 'POST',
        body: chat
      }),
      transformResponse: (response: ApiResponse<IChat>) => response.data
    }),

    updateChat: builder.mutation<IChat, Partial<IChat>>({
      query: ({ _id, ...data }) => ({
        url: '/chat/' + _id,
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: ApiResponse<IChat>) => response.data
    }),

    deleteChat: builder.mutation<IChat, string>({
      query: id => ({
        url: `/chat/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: ApiResponse<IChat>) => response.data
    }),

    findUserChats: builder.mutation<IChat[], string>({
      query: userId => ({
        url: `/chat/finduserchats/${userId}`,
        method: 'GET'
      }),
      transformResponse: (response: ApiResponse<IChat[]>) => response.data
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
