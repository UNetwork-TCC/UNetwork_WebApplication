import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '$api'
import { type Forum } from '$types'

const initialState: { forums: Forum[] | Record<string, unknown> } = {
    forums: []
}

export const fetchForum = createAsyncThunk(
    'forum/fetch',
    async () => {
        const { data } = await api.fetchForums()

        return data
    }
)

export const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchForum.fulfilled, (state, action) => {
            state.forums = action.payload

            console.log('Fóruns encontrados com sucesso!')
            console.log(state.forums)
        })
    }
})

export const forumReducer = forumSlice.reducer
