import { createSlice } from '@reduxjs/toolkit'
import * as api from '../../lib/api'

const initialState = {
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: async (state, action) => { 
            state.user = action.payload
            
            const { data } = await api.loginUser(action.payload)

            console.log(data)

            console.log(state.user)
            console.log(action)
        },
        signin: async (state, action) => { 
            state.user = action.payload
            
            const { data } = await api.createUser(action.payload)

            console.log(data)

            console.log(state.user)
            console.log(action)
        }
    }
})

export const { login, signin } = authSlice.actions
export const authReducer = authSlice.reducer