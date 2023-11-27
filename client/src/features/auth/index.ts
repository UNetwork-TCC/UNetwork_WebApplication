import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type User } from '$types'
import { apiSlice } from '$lib/api'

const obj = {}

const initialState: { 
    user: User,
    token: string | undefined
} = {
    user: obj as User,
    token: undefined
}

// REDUCERS

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{user?: User, accessToken?: string}>) => {
            const { user, accessToken } = action.payload

            if (user) {
                state.user = user
            }

            if (accessToken) {
                state.token = accessToken
            }
        },

        logOut: state => {
            state.user = obj as User
            state.token = ''
        }
    }
})

// AUTH API SLICE

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<{
            user: User, token: string, message: string
        }, {
           email: string, password: string
        }>({
            query: credentials => ({
                url: '/user/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        signup: builder.mutation<User, {
            name: string, email: string, password: string, username: string
        }>({
            query: credentials => ({
                url: '/user',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation } = authApiSlice
export const { logOut, setCredentials } = authSlice.actions
export const authReducer = authSlice.reducer