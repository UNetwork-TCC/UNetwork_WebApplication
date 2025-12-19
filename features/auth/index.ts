import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IUser } from '@/types'
import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'

const obj = {}

const initialState: {
  user: IUser
  token: string | undefined
} = {
  user: obj as IUser,
  token: undefined
}

// REDUCERS

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: IUser; accessToken?: string }>
    ) => {
      const { user, accessToken } = action.payload

      if (user) {
        state.user = user
      }

      if (accessToken) {
        state.token = accessToken
      }
    },

    logOut: state => {
      state.user = obj as IUser
      state.token = ''
    }
  }
})

// AUTH API SLICE

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      {
        user: IUser
        token: string
      },
      {
        email: string
        password: string
      }
    >({
      query: credentials => ({
        url: '/user/login',
        method: 'POST',
        body: { ...credentials }
      }),
      transformResponse: (response: unknown) =>
        extractData<{ user: IUser; token: string }>(response)
    }),

    signup: builder.mutation<
      IUser,
      {
        name: string
        email: string
        password: string
        username: string
      }
    >({
      query: credentials => ({
        url: '/user',
        method: 'POST',
        body: { ...credentials }
      }),
      transformResponse: (response: unknown) => extractData<IUser>(response)
    })
  })
})

export const { useLoginMutation, useSignupMutation } = authApiSlice
export const { logOut, setCredentials } = authSlice.actions
export const authReducer = authSlice.reducer
