import { createSlice } from '@reduxjs/toolkit'
import { type User } from '$types'
import { authApiSlice } from './authApiSlice'
import { useLoginMutation, useSignupMutation } from '$features/auth/authApiSlice'

const initialState: { 
    user: User | Record<string, unknown>,
    token: string | undefined
} = {
    user: {},
    token: undefined
}

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

export const authReducer = authSlice.reducer
export const { logOut, setCredentials } = authSlice.actions
export { authApiSlice, useLoginMutation, useSignupMutation }