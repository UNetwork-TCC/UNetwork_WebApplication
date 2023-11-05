import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '$api'
import { type User } from '$types'

const initialState: { 
    user: User | Record<string, unknown>,
    token: string | undefined
} = {
    user: {},
    token: undefined
}

export const login = createAsyncThunk(
    'auth/login',
    async (user: { email: string; password: string }) => {
        const { data } = await api.loginUser(user)

        return data
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async (user: Partial<User> | { name: string; email: string; password: string }) => {
        const { data } = await api.createUser(user)

        console.log(data)

        return data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = {}
            state.token = ''
        }
    },
    extraReducers: builder => {

        // Login Reducer

        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.token = action.payload.token

            console.log('Usuário logado com sucesso!')
            console.log(state.user)
            console.log(state.token)
        })

        builder.addCase(login.rejected, (_, action) => {
            console.log(action.error)
        })

        // Signup Reducer

        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload

            console.log('Usuário cadastrado com sucesso!')
            console.log(state.user)
        })
    }
})

export const authReducer = authSlice.reducer
export const { logOut } = authSlice.actions