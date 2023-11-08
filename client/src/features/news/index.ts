import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '$api'
import { type News } from '$types'

const initialState: { news: News[] } = {
    news: []
}

export const fetchNews = createAsyncThunk(
    'news/fetch',
    async () => {
        const { data } = await api.fetchNews()

        return data
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNews.fulfilled, (state, action: any) => {
            state.news = action.payload
        })
    }
})

// export const { fetchNews } = newsSlice.actions
export const newsReducer = newsSlice.reducer
