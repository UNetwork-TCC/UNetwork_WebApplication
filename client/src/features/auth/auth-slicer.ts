import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '$api'
import { type User } from '$types'

const initialState: { user: User | Record<string, unknown> } = {
    user: {}
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
    async (user: { name: string; email: string; password: string }) => {
        const { data } = await api.createUser(user)

        console.log(data)

        return data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {

        // Login Reducer

        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload

            console.log('Usuário logado com sucesso!')
            console.log(state.user)
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
