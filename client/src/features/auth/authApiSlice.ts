import { apiSlice } from '$lib/api/apiSlice'
import { type User } from '$types'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<{
            id: string, token: string, message: string
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
            name: string, email: string, password: string
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