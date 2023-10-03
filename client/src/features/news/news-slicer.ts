import { createSlice } from '@reduxjs/toolkit'
import * as api from '../../lib/api'

const initialState = {
    news: []
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        fetchNews: async state => {
            const { data } = await api.fetchNews()
            state.news = [ ...data.fetched ]
        }   
    }
})

export const { fetchNews } = newsSlice.actions
export const newsReducer = newsSlice.reducer