import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => { state.user = action.payload },
        signin: (state, action) => { state.user = action.payload }
    }
})

export const { login, signin } = authSlice.actions
export const authReducer = authSlice.reducer