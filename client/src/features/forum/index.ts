import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '$api'
import { type User, type Forum } from '$types'

const initialState: { 
    forum: Forum | Record<string, unknown>
    forums: Forum[],
} = {
    forum: {},
    forums: []
}

export const fetchForum = createAsyncThunk(
    'forum/fetch',
    async () => {
        const { data } = await api.fetchForums()

        return data
    }
)

export const getForum = createAsyncThunk(
    'forum/get',
    async (id: string) => {
        const { data } = await api.getForum(id)

        return data
    }
)

export const createForum = createAsyncThunk(
    'forum/create',
    async (forum: { title: string, description: string, topic: string, createdBy: User | string }) => {
        const { data } = await api.createForum(forum)

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

            console.log(state.forums)
        })

        builder.addCase(getForum.fulfilled, (state, action) => {
            state.forum = action.payload

            console.log('action payload:', action.payload)
        })

        builder.addCase(createForum.fulfilled, (state, action) => {
            state.forums = [ ...state.forums, action.payload ]
        })
    }
})

export const forumReducer = forumSlice.reducer
