import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '$api'
import { type User } from '$types'

const initialState: { user: User | Record<string, unknown> } = {
    user: {}
}

export const getUser = createAsyncThunk(
    'user/get',
    async (id: string) => {
        const { data } = await api.getUser(id)

        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

// export const { fetchNews } = newsSlice.actions
export const userReducer = userSlice.reducer
