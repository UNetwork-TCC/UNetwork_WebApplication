import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../../lib/api'
import { User } from '$types'

const initialState: { user: User | {} } = {
    user: {}
}

export const login = createAsyncThunk('auth/login', async (user: { email: string, password: string }) => {
    const { data } = await api.loginUser(user)
    
    return data
})

export const signup = createAsyncThunk('auth/signup', async (user: { name: string, email: string, password: string }) => {
    const { data } = await api.createUser(user)
    
    return data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload

            console.log('Usuário logado com sucesso!');
            console.log(state.user);
            
        })

        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload

            console.log('Usuário cadastrado com sucesso!');
            console.log(state.user);
            
        })
    }
    
    // reducers: {
    //     login: async (state, action: PayloadAction<{ email: string, password: string }>) => { 
    //         state.user = action.payload
            
    //         const { data } = await api.loginUser(action.payload)

    //         console.log(data)

    //         console.log(state.user)
    //         console.log(action)
    //     },
    //     signin: async (state, action) => { 
    //         state.user = action.payload
            
    //         const { data } = await api.createUser(action.payload)

    //         console.log(data)

    //         console.log(state.user)
    //         console.log(action)
    //     }
    // }
})

export const authReducer = authSlice.reducer