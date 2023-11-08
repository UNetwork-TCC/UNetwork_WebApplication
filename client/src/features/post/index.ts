import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '$api'
import { type Post } from '$types'

const initialState: { posts: Post[] } = {
    posts: []
}

export const fetchPosts = createAsyncThunk(
    'post/fetch',
    async () => {
        const { data } = await api.fetchPosts()

        console.log(data)

        return data
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPosts.fulfilled, (state, action: any) => {
            state.posts = action.payload
        })

        builder.addCase(fetchPosts.rejected, (_, action) => {
            console.log(action.error)
        })
    }
})

// export const { fetchPost } = postSlice.actions
export const postReducer = postSlice.reducer
