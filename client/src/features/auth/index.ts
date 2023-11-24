import { createSlice } from '@reduxjs/toolkit'
import { type User } from '$types'
import { apiSlice } from '$lib/api'

const initialState: { 
    user: User | Record<string, unknown>,
    token: string | undefined
} = {
    user: {},
    token: undefined
}

// REDUCERS

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload

            state.user = user
            state.token = accessToken
        },

        logOut: state => {
            state.user = {}
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
                url: '/user/login',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation } = authApiSlice
export const { logOut, setCredentials } = authSlice.actions
export const authReducer = authSlice.reducer